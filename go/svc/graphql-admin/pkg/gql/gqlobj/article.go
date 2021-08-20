package gqlobj

import "github.com/graphql-go/graphql"

type ArticleTypeResolverRegistry interface {
	User() func(params graphql.ResolveParams) (interface{}, error)
}

func ArticleType(r ArticleTypeResolverRegistry, tr TypeRegistry) *graphql.Object {
	return graphql.NewObject(
		graphql.ObjectConfig{
			Name: "Article",
			Fields: graphql.Fields{
				"id": &graphql.Field{
					Type:        graphql.ID,
					Description: "",
				},
				"title": &graphql.Field{
					Type:        graphql.String,
					Description: "",
				},
				"description": &graphql.Field{
					Type:        graphql.String,
					Description: "",
				},
				"user": &graphql.Field{
					Type:        tr.User(),
					Description: "",
					Args: graphql.FieldConfigArgument{
						"id": &graphql.ArgumentConfig{
							Type: graphql.Int,
						},
					},
					Resolve: r.User(),
				},
			},
		},
	)
}
