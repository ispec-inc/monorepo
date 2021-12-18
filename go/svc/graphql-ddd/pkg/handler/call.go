package handler

import (
	"context"

	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/adapter/call"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/resolver"
)

func (h Handler) Call(ctx context.Context, args call.CallArgs) (resolver.Call, error) {
	adapter := call.NewAdapter(h.registry)
	return adapter.Call(ctx, args)
}

func (h Handler) CallsByParticipant(
	ctx context.Context,
	args call.CallsByParticipant,
) (*resolver.CallConnection, error) {
	adapter := call.NewAdapter(h.registry)
	return adapter.CallsByParticipant(ctx, args)
}

func (h Handler) CallsByTeam(
	ctx context.Context,
	args call.CallsByTeam,
) (*resolver.CallConnection, error) {
	adapter := call.NewAdapter(h.registry)
	return adapter.CallsByTeam(ctx, args)
}
