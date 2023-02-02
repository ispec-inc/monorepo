package handler

import "github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/registry"

type Handler struct {
	registry registry.Registry
}

func New(registry registry.Registry) *Handler {
	return &Handler{
		registry: registry,
	}
}
