package gqlobj

import "github.com/graphql-go/graphql"

type TypeRegistry interface {
	User() *graphql.Object
	Article() *graphql.Object
}
