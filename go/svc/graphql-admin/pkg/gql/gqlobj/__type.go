package gqlobj

import "github.com/graphql-go/graphql"

var __Type = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "__Type",
		Fields: graphql.Fields{
			"kind": &graphql.Field{
			},
			"name": &graphql.Field{
				Type: graphql.String,
                Description: "",
			},
			"description": &graphql.Field{
				Type: graphql.String,
                Description: "",
			},
			"fields": &graphql.Field{
				Type: graphql.NewList(__Field),
                Description: "",
                Args: graphql.FieldConfigArgument{
                    "includeDeprecated": &graphql.ArgumentConfig{
                        Type: graphql.Boolean,
                        Description: "",
                    },
                },
                
			},
			"interfaces": &graphql.Field{
				Type: graphql.NewList(__Type),
                Description: "",
			},
			"possibleTypes": &graphql.Field{
				Type: graphql.NewList(__Type),
                Description: "",
			},
			"enumValues": &graphql.Field{
				Type: graphql.NewList(__EnumValue),
                Description: "",
                Args: graphql.FieldConfigArgument{
                    "includeDeprecated": &graphql.ArgumentConfig{
                        Type: graphql.Boolean,
                        Description: "",
                    },
                },
                
			},
			"inputFields": &graphql.Field{
				Type: graphql.NewList(__InputValue),
                Description: "",
			},
			"ofType": &graphql.Field{
			},
		},
	},
)
