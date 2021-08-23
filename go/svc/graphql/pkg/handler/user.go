package handler

import (
	"context"
	"strconv"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver/query"
)

type QueryUserArgs struct {
	ID graphql.ID
}

func (h Handler) CurrentUser(
	ctx context.Context,
) (*resolver.User, error) {
	return query.CurrentUser(ctx)
}

func (h Handler) User(
	ctx context.Context,
	args QueryUserArgs,
) (*resolver.User, error) {

	id, err := strconv.Atoi(string(args.ID))
	if err != nil {
		return nil, err
	}

	return query.User(ctx, int64(id))
}
