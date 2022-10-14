package main

import (
	"os"

	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/schema"
)

func main() {
	s, err := schema.String()
	if err != nil {
		panic(err)
	}

	file, err := os.Create("schema.graphql")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	file.WriteString(s)

}
