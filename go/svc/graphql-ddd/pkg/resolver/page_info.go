package resolver

import (
	"context"

	graphql "github.com/graph-gophers/graphql-go"
)

type PageInfo struct {
	startCursor     graphql.ID
	endCursor       graphql.ID
	hasNextPage     bool
	hasPreviousPage bool
}

func (p *PageInfo) StartCursor(ctx context.Context) *graphql.ID {
	return &p.startCursor
}

func (p *PageInfo) EndCursor(ctx context.Context) *graphql.ID {
	return &p.endCursor
}

func (p *PageInfo) HasNextPage(ctx context.Context) bool {
	return p.hasNextPage
}

func (p *PageInfo) HasPreviousPage(ctx context.Context) bool {
	return p.hasPreviousPage
}
