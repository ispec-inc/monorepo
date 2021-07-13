package gqlobj

import "github.com/graphql-go/graphql"

var Query = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"users": &graphql.Field{
				Type: graphql.NewList(User),
                Description: "",
                Args: graphql.FieldConfigArgument{
                    "id": &graphql.ArgumentConfig{
                        Type: graphql.Int,
                        Description: "",
                    },
                },
                
			},
			"__schema": &graphql.Field{
			},
			"__type": &graphql.Field{
			},
		},
	},
)
