package gqlobj

import "github.com/graphql-go/graphql"

type QueryResolverRegistry interface {
	Users() func(params graphql.ResolveParams) (interface{}, error)
}

func Query(r QueryResolverRegistry) graphql.ObjectConfig {
	return graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"users": &graphql.Field{
				Type:        graphql.NewList(User),
				Description: "",
				Resolve:     r.Users(),
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Type:        graphql.Int,
						Description: "",
					},
				},
			},
		},
	}
}
