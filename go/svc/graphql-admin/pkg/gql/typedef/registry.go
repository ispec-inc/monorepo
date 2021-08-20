package typedef

import "github.com/graphql-go/graphql"

type Registry struct {
}

func NewRegistry() Registry {
	return Registry{}
}

func (r Registry) User() *graphql.Object {
	return userType
}

func (r Registry) Article() *graphql.Object {
	return NewArticle()
}
