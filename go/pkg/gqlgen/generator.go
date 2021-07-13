package gqlgen

import (
	"fmt"
	"os"
	"strings"
	"text/template"

	"github.com/vektah/gqlparser/v2/ast"
)

const (
	typeTemplate   = "./pkg/gqlgen/type.gotpl"
	pkgName        = "gqlobj"
	typePrefix     = "type"
	queryPrefix    = "query"
	mutationPrefix = "mutation"
)

type Generator struct {
	Schema      *ast.Schema
	PackageName string
}

func New(
	s *ast.Schema,
	pkg string,
) Generator {
	return Generator{
		Schema:      s,
		PackageName: pkg,
	}
}

func (g Generator) To(dir string) error {
	var funcs []func() error

	err := os.Mkdir(dir, os.ModePerm)
	if err != nil {
		if !os.IsExist(err) {
			return err
		}
	}

	err = g.generateType(dir, &funcs)
	if err != nil {
		return err
	}

	defer func() error {
		for _, f := range funcs {
			err := f()
			if err != nil {
				return err
			}
		}
		return nil
	}()

	return nil
}

func (g Generator) generateType(baseDir string, defers *[]func() error) error {
	tmpl, err := template.ParseFiles(typeTemplate)
	if err != nil {
		return err
	}

	for _, t := range g.Schema.Types {
		f, err := g.openFile(t, baseDir)
		if err != nil {
			return err
		}

		tg := newTypeGenerator(t)
		err = tmpl.Execute(f, tg)
		if err != nil {
			return err
		}

		*defers = append(*defers, f.Close)
	}

	return nil
}

func (g Generator) openFile(t *ast.Definition, dir string) (*os.File, error) {
	fname := fmt.Sprintf("%s/%s.go", dir, strings.ToLower(t.Name))
	f, err := os.Create(fname)
	if err != nil {
		return nil, err
	}

	return f, err
}
