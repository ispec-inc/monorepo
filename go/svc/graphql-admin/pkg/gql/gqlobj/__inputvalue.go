package gqlobj

import "github.com/graphql-go/graphql"

var __InputValue = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "__InputValue",
		Fields: graphql.Fields{
			"name": &graphql.Field{
				Type: graphql.String,
                Description: "",
			},
			"description": &graphql.Field{
				Type: graphql.String,
                Description: "",
			},
			"type": &graphql.Field{
			},
			"defaultValue": &graphql.Field{
				Type: graphql.String,
                Description: "",
			},
		},
	},
)
