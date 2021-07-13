package gqlobj

import "github.com/graphql-go/graphql"

var String = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "String",
		Fields: graphql.Fields{
		},
	},
)
