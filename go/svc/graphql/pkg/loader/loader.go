package loader

import (
	"context"
	"fmt"

	"github.com/graph-gophers/dataloader"
)

type key string

const (
	userKey = "user"
)

type LookUp struct {
	lookup map[key]dataloader.BatchFunc
}

func NewLookUp() *LookUp {
	return &LookUp{
		lookup: map[key]dataloader.BatchFunc{
			userKey: batchLoadUser,
		},
	}
}

func (l *LookUp) Attach(ctx context.Context) context.Context {
	for k, f := range l.lookup {
		ctx = context.WithValue(ctx, k, dataloader.NewBatchedLoader(f))
	}

	return ctx
}

func getLoader(ctx context.Context, k key) (*dataloader.Loader, error) {
	ldr, ok := ctx.Value(k).(*dataloader.Loader)
	if !ok {
		return nil, fmt.Errorf("unable to find %s loader on the request context", k)
	}

	return ldr, nil
}
