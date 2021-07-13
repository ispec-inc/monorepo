package gqlobj

import "github.com/graphql-go/graphql"

var Boolean = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Boolean",
		Fields: graphql.Fields{
		},
	},
)
