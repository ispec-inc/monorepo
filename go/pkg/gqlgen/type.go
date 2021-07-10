package gqlgen

import (
	"os"
	"text/template"

	"github.com/vektah/gqlparser/v2/ast"
)

const (
	typeTemplate = "./pkg/gqlgen/type.gotpl"
)

type TypeGenerator struct {
	Definition  *ast.Definition
	PackageName string
}

func NewType(
	def *ast.Definition,
	pkg string,
) TypeGenerator {
	return TypeGenerator{
		Definition:  def,
		PackageName: pkg,
	}
}

func (g TypeGenerator) To(out string) error {
	tmpl, err := template.ParseFiles(typeTemplate)
	if err != nil {
		return err
	}

	f, err := os.Create(out)
	if err != nil {
		return err
	}

	defer f.Close()

	return tmpl.Execute(f, g)
}
