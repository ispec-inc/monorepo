package gqlobj

import "github.com/graphql-go/graphql"

var Int = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Int",
		Fields: graphql.Fields{
		},
	},
)
