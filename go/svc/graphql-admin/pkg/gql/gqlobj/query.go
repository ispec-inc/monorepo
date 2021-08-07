package gqlobj

import "github.com/graphql-go/graphql"

type QueryResolverRegistry interface {
	Users() func(params graphql.ResolveParams) (interface{}, error)
	Articles() func(params graphql.ResolveParams) (interface{}, error)
}

func Query(r QueryResolverRegistry, tr TypeRegistry) *graphql.Object {
	return graphql.NewObject(graphql.ObjectConfig{
		Name: "RootQuery",
		Fields: graphql.Fields{
			"users": &graphql.Field{
				Type:        graphql.NewList(tr.User()),
				Description: "",
				Resolve:     r.Users(),
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Type:        graphql.Int,
						Description: "",
					},
				},
			},
			"articles": &graphql.Field{
				Type:        graphql.NewList(tr.Article()),
				Description: "",
				Resolve:     r.Articles(),
				Args: graphql.FieldConfigArgument{
					"title": &graphql.ArgumentConfig{
						Type:        graphql.String,
						Description: "",
					},
				},
			},
		},
	})
}
