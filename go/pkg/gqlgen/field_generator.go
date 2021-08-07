package gqlgen

import (
	"github.com/vektah/gqlparser/v2/ast"
)

type fieldGenerator struct {
	Definition *ast.FieldDefinition
	Arguments  []argGenerator
}

func (fg fieldGenerator) ExtractType() string {
	return extractType(fg.Definition.Type)
}

func (fg fieldGenerator) IsPrivate() bool {
	return isPrivateType(fg.Definition.Type.NamedType)
}

func (fd fieldGenerator) HasArgs() bool {
	return len(fd.Arguments) != 0
}

func (fd fieldGenerator) UpperCamelName() string {
	return lowerCamelToUpperCamel(fd.Definition.Name)
}

func (fd fieldGenerator) IsUserDefinedType() bool {
	return !(isDefiniedType(fd.Definition.Type.NamedType) || fd.IsPrivate())
}

type argGenerator struct {
	Definition *ast.ArgumentDefinition
}

func (ag argGenerator) ExtractType() string {
	return extractType(ag.Definition.Type)
}

func (ag argGenerator) IsPrivate() bool {
	return isPrivateType(ag.Definition.Type.NamedType)
}

func (ag argGenerator) UpperCamelName() string {
	return lowerCamelToUpperCamel(ag.Definition.Name)
}
