"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const file = './i18n/lang/i18n-declare.d.ts'; // 元にするinterfaceのファイル
function getIdentifer(ps) {
    if (ps.name.kind === ts.SyntaxKind.Identifier) {
        const psname = ps.name;
        const name = psname.escapedText.toString();
        if (name.length > 0) {
            return name;
        }
    }
    return '';
}
function getType(ps) {
    if (!ps.type) {
        return 'invalid';
    }
    if (ps.type.kind === ts.SyntaxKind.StringKeyword) {
        return 'string';
    }
    if (ps.type.kind === ts.SyntaxKind.TypeLiteral) {
        return ps.type;
    }
    return 'invalid';
}
function parseMembers(members, path = '') {
    const result = {};
    members.map((member) => {
        if (member.kind !== ts.SyntaxKind.PropertySignature) {
            return;
        }
        const name = getIdentifer(member);
        if (name.length === 0) {
            return;
        }
        const type = getType(member);
        if (type === 'invalid') {
            return;
        }
        const val = path.length === 0 ? name : path + '.' + name;
        if (type === 'string') {
            result[name] = val;
            return;
        }
        result[name] = parseMembers(type.members, val);
    });
    return result;
}
function parseInterface(itrfc) {
    return parseMembers(itrfc.members);
}
function createIndent(nest) {
    let result = '';
    for (let i = 0; i < nest; i++) {
        result += '  ';
    }
    return result;
}
function toString(data, nest = 0) {
    const indent = createIndent(nest);
    let result = indent + '{\n';
    const indent2 = createIndent(nest + 1);
    Object.keys(data).map((key) => {
        const v = data[key];
        if (typeof v === 'string') {
            result += indent2 + key + ": '" + v + "',\n";
        }
        else {
            result += indent2 + key + ': ' + toString(v, nest + 1) + ',\n';
        }
    });
    return result + indent + '}';
}
function toTS(data) {
    return ("import { I18n } from '~/i18n/lang/i18n-declare';\n\n" +
        'export const i18nComplements: I18n = ' +
        toString(data) +
        ';\n');
}
const program = ts.createProgram([file], {});
const source = program.getSourceFile(file);
const itrfc = source === null || source === void 0 ? void 0 : source.statements[0];
if (itrfc) {
    const data = parseInterface(itrfc);
    const src = toTS(data);
    process.stdout.write(src);
}
