package gqlgen

import (
	"github.com/vektah/gqlparser/v2/ast"
)

type typeGenerator struct {
	Definition          *ast.Definition
	FieldDefinitionList []fieldGenerator
	PackageName         string
}

type typeGenerators struct {
	Generators  []typeGenerator
	PackageName string
}

func newTypeGenerator(def *ast.Definition) typeGenerator {
	fgs := make([]fieldGenerator, len(def.Fields))

	for i := range def.Fields {

		fg := fieldGenerator{
			Definition: def.Fields[i],
			Arguments:  newArgGenerators(def.Fields[i].Arguments),
		}
		fgs[i] = fg
	}

	return typeGenerator{
		Definition:          def,
		FieldDefinitionList: fgs,
		PackageName:         pkgName,
	}
}

func newArgGenerators(adl ast.ArgumentDefinitionList) []argGenerator {
	args := make([]argGenerator, len(adl))

	for t := range adl {
		args[t] = argGenerator{
			Definition: adl[t],
		}
	}

	return args

}

func (tg typeGenerator) IsPrivate() bool {
	return isPrivateType(tg.Definition.Name)
}

func (tg typeGenerator) UpperCamelName() string {
	return lowerCamelToUpperCamel(tg.Definition.Name)
}

func (tg typeGenerator) IsDefinedType() bool {
	return isDefiniedType(tg.Definition.Name)
}
