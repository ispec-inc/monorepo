package query

import (
	"context"

	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver"
)

func CurrentUser(ctx context.Context) (*resolver.User, error) {
	return resolver.NewUser(ctx, resolver.UserResolverArgs{ID: uint(1)})
}

func User(ctx context.Context, id uint) (*resolver.User, error) {
	return resolver.NewUser(ctx, resolver.UserResolverArgs{ID: id})
}
