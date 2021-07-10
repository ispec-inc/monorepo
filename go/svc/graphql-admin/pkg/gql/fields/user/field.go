package user

import (
	"github.com/graphql-go/graphql"
	"github.com/ispec-inc/monorepo/go/svc/graphql-admin/pkg/gql/obj"
)

func Mount(f graphql.Fields) {
	resolver := newResolver()

	f["users"] = &graphql.Field{
		Type:    graphql.NewList(obj.User),
		Resolve: resolver.list,
	}
}
