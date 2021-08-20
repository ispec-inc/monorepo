package typedef

import (
	"github.com/graphql-go/graphql"
	"github.com/ispec-inc/monorepo/go/svc/graphql-admin/pkg/gql/gqlobj"
	"github.com/ispec-inc/monorepo/go/svc/graphql-admin/pkg/gql/resolver/user"
)

func NewArticle() *graphql.Object {

	a := NewArticleTypeResolverRegistryImpl()
	r := Registry{}
	return gqlobj.ArticleType(a, r)
}

type ArticleTypeResolverRegistryImpl struct {
	userLoader user.Loader
}

func NewArticleTypeResolverRegistryImpl() ArticleTypeResolverRegistryImpl {
	return ArticleTypeResolverRegistryImpl{
		userLoader: user.NewLoader(),
	}
}

func (a ArticleTypeResolverRegistryImpl) User() func(params graphql.ResolveParams) (interface{}, error) {
	return a.userLoader.Do
}
