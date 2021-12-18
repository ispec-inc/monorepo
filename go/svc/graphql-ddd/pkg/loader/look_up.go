package loader

import (
	"context"

	"github.com/graph-gophers/dataloader"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/registry"
)

type key string

const (
	userKey      = "user"
	recordingKey = "recording"
)

type BatchedLoader interface {
	Load(ctx context.Context, keys dataloader.Keys) []*dataloader.Result
}

var (
	LookUpTable = map[key]func(registry.Repository) BatchedLoader{
		userKey:      NewUserBatchedLoader,
		recordingKey: NewRecordingBatchedLoader,
	}
)
