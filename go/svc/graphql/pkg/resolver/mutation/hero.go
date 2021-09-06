package mutation

import (
	"context"

	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver"
)

type HeroInput struct {
	Name   string
	Age    int32
	IsJedi *bool
}

func CreateHero(ctx context.Context, input HeroInput) (*resolver.Hero, error) {
	h := model.NewHero(input.Name, int(input.Age), *input.IsJedi)
	if err := h.Create(); err != nil {
		return nil, err
	}
	return resolver.NewHero(ctx, *h), nil
}
