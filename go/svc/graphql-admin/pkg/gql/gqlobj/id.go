package gqlobj

import "github.com/graphql-go/graphql"

var ID = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "ID",
		Fields: graphql.Fields{
		},
	},
)
