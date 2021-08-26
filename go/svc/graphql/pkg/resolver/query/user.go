package query

import (
	"context"

	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver"
)

func CurrentUser(ctx context.Context) (*resolver.User, error) {
	return resolver.LoadUser(ctx, resolver.UserResolverArgs{ID: int64(1)})
}

func User(ctx context.Context, id int64) (*resolver.User, error) {
	return resolver.LoadUser(ctx, resolver.UserResolverArgs{ID: id})
}

func Users(ctx context.Context) (*[]*resolver.User, error) {
	us := &model.Users{}
	err := us.List([]int64{})
	if err != nil {
		return nil, err
	}

	rs := make([]*resolver.User, len(*us))
	for i := range *us {
		rs[i] = resolver.NewUser(ctx, (*us)[i])
	}

	return &rs, nil
}
