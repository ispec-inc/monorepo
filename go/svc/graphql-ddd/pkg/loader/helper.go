package loader

import (
	"context"
	"fmt"

	"github.com/graph-gophers/dataloader"
)

func getLoader(ctx context.Context, k key) (*dataloader.Loader, error) {
	ldr, ok := ctx.Value(k).(*dataloader.Loader)
	if !ok {
		return nil, fmt.Errorf("unable to find %s loader on the request context", k)
	}

	return ldr, nil
}
