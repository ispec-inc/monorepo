package resolver

import (
	"context"
	"fmt"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/loader"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
)

type Hero struct {
	hero model.Hero
}

type HeroResolverArgs struct {
	ID int64
}

func NewHero(ctx context.Context, h model.Hero) *Hero {
	return &Hero{hero: h}
}

func LoadHero(ctx context.Context, args HeroResolverArgs) (*Hero, error) {
	h, err := loader.LoadHero(ctx, args.ID)
	if err != nil {
		return nil, err
	}
	return &Hero{hero: *h}, nil
}

func (h Hero) ID() graphql.ID {
	return graphql.ID(fmt.Sprintf("%d", h.hero.ID))
}

func (h Hero) Name() string {
	return h.hero.Name
}

func (h Hero) Age() int32 {
	return int32(h.hero.Age)
}

func (h Hero) IsJedi() bool {
	return h.hero.IsJedi
}
