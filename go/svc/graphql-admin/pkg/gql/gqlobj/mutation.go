package gqlobj

import "github.com/graphql-go/graphql"

var Mutation = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Mutation",
		Fields: graphql.Fields{
			"createArticle": &graphql.Field{
				Type:        Article,
				Description: "",
				Args: graphql.FieldConfigArgument{
					"title": &graphql.ArgumentConfig{
						Type:        graphql.String,
						Description: "",
					},
					"description": &graphql.ArgumentConfig{
						Type:        graphql.String,
						Description: "",
					},
				},
			},
		},
	},
)
