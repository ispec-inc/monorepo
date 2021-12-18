package handler

import (
	"context"

	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/adapter/user"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/registry"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/resolver"
)

type Handler struct {
	registry registry.Registry
}

func New(registry registry.Registry) *Handler {
	return &Handler{
		registry: registry,
	}
}

func (h Handler) CurrentUser(ctx context.Context) (*resolver.User, error) {
	adapter := user.NewAdapter(h.registry)
	return adapter.CurrentUser(ctx)
}
