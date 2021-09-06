package handler

import (
	"context"
	"strconv"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver/mutation"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver/query"
)

type QueryHeroArgs struct {
	ID graphql.ID
}

func (h Handler) Hero(ctx context.Context, args QueryHeroArgs) (*resolver.Hero, error) {
	id, err := strconv.Atoi(string(args.ID))
	if err != nil {
		return nil, err
	}
	return query.Hero(ctx, int64(id))
}

func (h Handler) Heroes(ctx context.Context) (*[]*resolver.Hero, error) {
	return query.Heroes(ctx)
}

type MutationHeroArgs struct {
	Input mutation.HeroInput
}

func (h Handler) CreateHero(ctx context.Context, args MutationHeroArgs) (*resolver.Hero, error) {
	return mutation.CreateHero(ctx, args.Input)
}
