package pagination

import (
	"context"

	graphql "github.com/graph-gophers/graphql-go"
)

type (
	PageInfo struct {
		startCursor     graphql.ID
		endCursor       graphql.ID
		hasNextPage     bool
		hasPreviousPage bool
	}
	NewPageInfoArgs struct {
		StartCursor     graphql.ID
		EndCursor       graphql.ID
		HasNextPage     bool
		HasPreviousPage bool
	}
)

func NewPageInfo(args NewPageInfoArgs) *PageInfo {
	return &PageInfo{
		startCursor:     args.StartCursor,
		endCursor:       args.EndCursor,
		hasNextPage:     args.HasNextPage,
		hasPreviousPage: args.HasPreviousPage,
	}
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
