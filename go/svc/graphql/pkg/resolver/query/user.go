package query

import (
	"context"

	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver"
)

func CurrentUser(ctx context.Context) (*resolver.User, error) {
	return resolver.NewUser(ctx, resolver.UserResolverArgs{ID: int64(1)})
}

func User(ctx context.Context, id int64) (*resolver.User, error) {
	return resolver.NewUser(ctx, resolver.UserResolverArgs{ID: id})
}
