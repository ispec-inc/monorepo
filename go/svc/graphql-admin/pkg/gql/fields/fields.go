package fields

import (
	"github.com/graphql-go/graphql"
	"github.com/ispec-inc/monorepo/go/svc/graphql-admin/pkg/gql/fields/article"
	"github.com/ispec-inc/monorepo/go/svc/graphql-admin/pkg/gql/fields/user"
)

func New() graphql.Fields {

	fs := graphql.Fields{}
	article.Mount(fs)
	user.Mount(fs)

	return fs
}
