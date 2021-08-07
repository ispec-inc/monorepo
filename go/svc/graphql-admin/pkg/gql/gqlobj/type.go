package gqlobj

import "github.com/graphql-go/graphql"

type TypeRegistry interface {
    User() graphql.Type
    Article() graphql.Type
}
