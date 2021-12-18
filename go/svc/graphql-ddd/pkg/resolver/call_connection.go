package resolver

import (
	"github.com/ispec-inc/monorepo/go/pkg/pagination"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/call"
)

type CallConnection struct {
	totalCount int
	calls      []call.Call
	firstID    call.ID
	lastID     call.ID
}

func NewCallConnection(
	calls []call.Call,
	first call.ID,
	last call.ID,
	totalCount int,
) CallConnection {
	return CallConnection{
		totalCount: totalCount,
		calls:      calls,
		firstID:    first,
		lastID:     last,
	}
}

func (c *CallConnection) TotalCount() int32 {
	return int32(c.totalCount)
}

func (c *CallConnection) Edges() *[]*CallEdge {
	e := make([]*CallEdge, len(c.calls))
	for i := range e {
		e[i] = &CallEdge{
			cursor: pagination.EncodeCursor(int64(c.calls[i].ID)),
			node:   NewCall(c.calls[i]),
		}
	}
	return &e
}

func (c *CallConnection) PageInfo() *pagination.PageInfo {
	from := c.calls[0].ID
	to := c.calls[len(c.calls)-1].ID
	return pagination.NewPageInfo(
		pagination.NewPageInfoArgs{
			StartCursor:     pagination.EncodeCursor(int64(from)),
			EndCursor:       pagination.EncodeCursor(int64(to)),
			HasNextPage:     to != c.lastID,
			HasPreviousPage: from != c.firstID,
		},
	)
}
