package gqlobj

import "github.com/graphql-go/graphql"

var __Schema = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "__Schema",
		Fields: graphql.Fields{
			"types": &graphql.Field{
				Type: graphql.NewList(__Type),
                Description: "",
			},
			"queryType": &graphql.Field{
			},
			"mutationType": &graphql.Field{
			},
			"subscriptionType": &graphql.Field{
			},
			"directives": &graphql.Field{
				Type: graphql.NewList(__Directive),
                Description: "",
			},
		},
	},
)
