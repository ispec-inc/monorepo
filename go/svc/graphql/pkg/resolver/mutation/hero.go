package mutation

import (
	"context"

	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver"
)

type CreateHeroArgs struct {
	Name   string
	Age    int32
	IsJedi *bool
}

func CreateHero(ctx context.Context, args CreateHeroArgs) (*resolver.Hero, error) {
	h := model.NewHero(args.Name, int(args.Age), *args.IsJedi)
	if err := h.Create(); err != nil {
		return nil, err
	}
	return resolver.NewHero(ctx, *h), nil
}
