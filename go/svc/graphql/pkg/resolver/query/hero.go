package query

import (
	"context"

	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver"
)

func Hero(ctx context.Context, id int64) (*resolver.Hero, error) {
	return resolver.LoadHero(ctx, resolver.HeroResolverArgs{ID: id})
}

func Heroes(ctx context.Context) (*[]*resolver.Hero, error) {
	us := model.Heroes{}
	err := us.List(nil)
	if err != nil {
		return nil, err
	}
	rs := make([]*resolver.Hero, len(us))
	for i := range us {
		rs[i] = resolver.NewHero(ctx, us[i])
	}
	return &rs, nil
}
