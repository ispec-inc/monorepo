package gqlgen

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
	"text/template"

	"github.com/vektah/gqlparser/v2/ast"
)

const (
	typeDefTemplate  = "./pkg/gqlgen/type_def.gotpl"
	typeTemplate     = "./pkg/gqlgen/type.gotpl"
	queryTemplate    = "./pkg/gqlgen/query.gotpl"
	mutationTemplate = "./pkg/gqlgen/mutation.gotpl"

	pkgName = "gqlobj"

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

	err = g.generateQuery(dir, &funcs)
	if err != nil {
		return err
	}

	err = g.generateMutation(dir, &funcs)
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
	var gens []typeGenerator
	for _, t := range g.Schema.Types {
		tmpl, err := template.ParseFiles(typeDefTemplate)
		if err != nil {
			return err
		}

		tg := newTypeGenerator(t)
		if isNotGenerateType(tg.Definition.Name) {
			continue
		}

		gens = append(gens, tg)

		f, err := g.openFile(t, baseDir)
		if err != nil {
			return err
		}

		err = tmpl.Execute(f, tg)
		if err != nil {
			return err
		}

		_, err = exec.Command("gofmt", "-w", f.Name()).Output()
		if err != nil {
			return err
		}

		*defers = append(*defers, f.Close)
	}

	tmpl, err := template.ParseFiles(typeTemplate)
	if err != nil {
		return err
	}

	fname := fmt.Sprintf("%s/type.go", baseDir)
	f, err := os.Create(fname)
	if err != nil {
		return err
	}

	tgens := typeGenerators{
		Generators:  gens,
		PackageName: pkgName,
	}
	err = tmpl.Execute(f, tgens)
	if err != nil {
		return err
	}

	return nil
}

func (g Generator) generateQuery(baseDir string, defers *[]func() error) error {

	if g.Schema.Query == nil {
		return nil
	}

	tmpl, err := template.ParseFiles(queryTemplate)
	if err != nil {
		return err
	}

	f, err := g.openFile(g.Schema.Query, baseDir)
	if err != nil {
		return err
	}

	tg := newTypeGenerator(g.Schema.Query)
	err = tmpl.Execute(f, tg)
	if err != nil {
		return err
	}

	_, err = exec.Command("gofmt", "-w", f.Name()).Output()
	if err != nil {
		return err
	}

	*defers = append(*defers, f.Close)

	return nil
}

func (g Generator) generateMutation(baseDir string, defers *[]func() error) error {

	if g.Schema.Mutation == nil {
		return nil
	}

	tmpl, err := template.ParseFiles(mutationTemplate)
	if err != nil {
		return err
	}

	f, err := g.openFile(g.Schema.Mutation, baseDir)
	if err != nil {
		return err
	}

	tg := newTypeGenerator(g.Schema.Mutation)
	err = tmpl.Execute(f, tg)
	if err != nil {
		return err
	}

	_, err = exec.Command("gofmt", "-w", f.Name()).Output()
	if err != nil {
		return err
	}

	*defers = append(*defers, f.Close)

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
