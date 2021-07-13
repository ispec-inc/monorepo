package gqlobj

import "github.com/graphql-go/graphql"

var __Field = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "__Field",
		Fields: graphql.Fields{
			"name": &graphql.Field{
				Type: graphql.String,
                Description: "",
			},
			"description": &graphql.Field{
				Type: graphql.String,
                Description: "",
			},
			"args": &graphql.Field{
				Type: graphql.NewList(__InputValue),
                Description: "",
			},
			"type": &graphql.Field{
			},
			"isDeprecated": &graphql.Field{
				Type: graphql.Boolean,
                Description: "",
			},
			"deprecationReason": &graphql.Field{
				Type: graphql.String,
                Description: "",
			},
		},
	},
)
