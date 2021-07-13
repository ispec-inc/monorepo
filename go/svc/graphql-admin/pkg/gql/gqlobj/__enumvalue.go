package gqlobj

import "github.com/graphql-go/graphql"

var __EnumValue = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "__EnumValue",
		Fields: graphql.Fields{
			"name": &graphql.Field{
				Type: graphql.String,
                Description: "",
			},
			"description": &graphql.Field{
				Type: graphql.String,
                Description: "",
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
