import * as ts from 'typescript'

const file = './i18n/lang/i18n-declare.d.ts' // 元にするinterfaceのファイル

function getIdentifer(ps: ts.PropertySignature): string {
  if (ps.name.kind === ts.SyntaxKind.Identifier) {
    const psname = ps.name as ts.Identifier
    const name = psname.escapedText.toString()
    if (name.length > 0) {
      return name
    }
  }
  return ''
}

function getType(
  ps: ts.PropertySignature
): 'string' | ts.TypeLiteralNode | 'invalid' {
  if (!ps.type) {
    return 'invalid'
  }
  if (ps.type.kind === ts.SyntaxKind.StringKeyword) {
    return 'string'
  }
  if (ps.type.kind === ts.SyntaxKind.TypeLiteral) {
    return ps.type as ts.TypeLiteralNode
  }
  return 'invalid'
}

type KV = { [key: string]: string | KV }

function parseMembers(members: ts.NodeArray<ts.TypeElement>, path = ''): KV {
  const result: KV = {}

  members.map((member) => {
    if (member.kind !== ts.SyntaxKind.PropertySignature) {
      return
    }

    const name = getIdentifer(member as ts.PropertySignature)
    if (name.length === 0) {
      return
    }

    const type = getType(member as ts.PropertySignature)
    if (type === 'invalid') {
      return
    }

    const val = path.length === 0 ? name : path + '.' + name
    if (type === 'string') {
      result[name] = val
      return
    }

    result[name] = parseMembers(type.members, val)
  })

  return result
}

function parseInterface(itrfc: ts.InterfaceDeclaration): KV {
  return parseMembers(itrfc.members)
}

function createIndent(nest: number): string {
  let result = ''
  for (let i = 0; i < nest; i++) {
    result += '  '
  }
  return result
}

function toString(data: KV, nest = 0): string {
  const indent = createIndent(nest)

  let result = indent + '{\n'
  const indent2 = createIndent(nest + 1)
  Object.keys(data).map((key) => {
    const v = data[key]
    if (typeof v === 'string') {
      result += indent2 + key + ": '" + v + "',\n"
    } else {
      result += indent2 + key + ': ' + toString(v, nest + 1) + ',\n'
    }
  })

  return result + indent + '}'
}

function toTS(data: KV): string {
  return (
    "import { I18n } from '~/i18n/lang/i18n-declare';\n\n" +
    'export const i18nComplements: I18n = ' +
    toString(data) +
    ';\n'
  )
}

const program = ts.createProgram([file], {})
const source = program.getSourceFile(file)
const itrfc = source?.statements[0]
if (itrfc) {
  const data = parseInterface(itrfc as ts.InterfaceDeclaration)
  const src = toTS(data)
  process.stdout.write(src)
}
