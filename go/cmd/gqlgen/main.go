package main

import (
	"log"

	"github.com/ispec-inc/monorepo/go/pkg/gqlgen"
	gqlparser "github.com/vektah/gqlparser/v2"
	"github.com/vektah/gqlparser/v2/ast"
)

func main() {
	src := &ast.Source{
		Name: "./svc/graphql-admin/graphql/queries/user.graphql",
		Input: `
			type User{
				id: Int
				name: String
				email: String
			}
		`,
	}
	s, gerr := gqlparser.LoadSchema(src)
	if gerr != nil {
		log.Fatal(gerr)
	}

	g := gqlgen.NewType(
		s.Types["User"],
		"queries",
	)

	err := g.To("./svc/graphql-admin/graphql/queries/user.go")
	if err != nil {
		log.Fatal(err)
	}
}
