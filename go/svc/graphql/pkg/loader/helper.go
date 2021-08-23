package loader

import (
	"context"
	"fmt"
	"strconv"

	"github.com/graph-gophers/dataloader"
)

func extractIDsFromKeys(keys dataloader.Keys) []int64 {
	ids := make([]int64, len(keys))
	for i := range keys {
		id, err := strconv.Atoi(keys[i].String())
		if err == nil {
			ids[i] = int64(id)
		}
	}

	return ids
}

func newKeysFromIDs(ids []int64) dataloader.Keys {
	keys := make([]string, len(ids))

	for i := range ids {
		keys[i] = fmt.Sprintf("%d", ids[i])
	}
	return dataloader.NewKeysFromStrings(keys)
}

func getLoader(ctx context.Context, k key) (*dataloader.Loader, error) {
	ldr, ok := ctx.Value(k).(*dataloader.Loader)
	if !ok {
		return nil, fmt.Errorf("unable to find %s loader on the request context", k)
	}

	return ldr, nil
}
