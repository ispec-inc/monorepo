package gqlobj

import "github.com/graphql-go/graphql"

var __Directive = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "__Directive",
		Fields: graphql.Fields{
			"name": &graphql.Field{
				Type: graphql.String,
                Description: "",
			},
			"description": &graphql.Field{
				Type: graphql.String,
                Description: "",
			},
			"locations": &graphql.Field{
				Type: graphql.NewList(__DirectiveLocation),
                Description: "",
			},
			"args": &graphql.Field{
				Type: graphql.NewList(__InputValue),
                Description: "",
			},
			"isRepeatable": &graphql.Field{
				Type: graphql.Boolean,
                Description: "",
			},
		},
	},
)
