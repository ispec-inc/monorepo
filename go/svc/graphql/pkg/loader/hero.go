package loader

import (
	"context"
	"fmt"

	"github.com/graph-gophers/dataloader"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
)

type HeroResult struct {
	Hero  model.Hero
	Error error
}

func LoadHero(ctx context.Context, id int64) (*model.Hero, error) {
	ldr, err := getLoader(ctx, heroKey)
	if err != nil {
		return nil, err
	}

	thunk := ldr.Load(
		ctx,
		dataloader.StringKey(fmt.Sprintf("%d", id)),
	)
	data, err := thunk() // ???
	if err != nil {
		return nil, err
	}

	h, ok := data.(model.Hero)
	if !ok {
		return nil, ErrLoaderResultTyping
	}
	return &h, nil
}

func batchLoadHero(ctx context.Context, keys dataloader.Keys) []*dataloader.Result {
	ids := extractIDsFromKeys(keys)

	hs := &model.Heroes{}
	err := hs.List(ids)

	rs := make([]*dataloader.Result, len(*hs))
	for i := range *hs {
		rs[i] = &dataloader.Result{Data: (*hs)[i], Error: err}
	}
	return rs
}
