package loader

import (
	"context"
	"fmt"
	"strconv"

	"github.com/graph-gophers/dataloader"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/recording"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/query"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/registry"
)

type RecordingResult struct {
	Recording recording.Recording
	Error     error
}

func LoadRecording(
	ctx context.Context,
	id recording.ID,
) (*recording.Recording, error) {
	ldr, err := getLoader(ctx, recordingKey)
	if err != nil {
		return nil, err
	}

	thunk := ldr.Load(
		ctx,
		dataloader.StringKey(fmt.Sprintf("%d", id)),
	)
	data, err := thunk()
	if err != nil {
		return nil, err
	}

	r, ok := data.(recording.Recording)
	if !ok {
		return nil, ErrLoaderResultTyping
	}
	return &r, nil
}

type RecordingBatchedLoader struct {
	q query.Recording
}

func NewRecordingBatchedLoader(
	registry registry.Repository,
) BatchedLoader {
	return RecordingBatchedLoader{
		q: registry.NewRecordingQuery(),
	}
}

func (u RecordingBatchedLoader) Load(
	ctx context.Context,
	keys dataloader.Keys,
) []*dataloader.Result {
	ids := make([]recording.ID, len(keys))
	for i := range keys {
		id, err := strconv.Atoi(keys[i].String())
		if err == nil {
			ids[i] = recording.ID(int64(id))
		}
	}
	rcs, err := u.q.List(ids)
	rcmap := rcs.ToMap()

	rs := make([]*dataloader.Result, len(*rcs))

	for i, id := range ids {
		rs[i] = &dataloader.Result{Data: rcmap[id], Error: err}
	}

	return rs
}
