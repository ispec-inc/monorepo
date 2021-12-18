package resolver

import (
	graphql "github.com/graph-gophers/graphql-go"
)

type CallEdge struct {
	cursor graphql.ID
	node   *Call
}

func (c *CallEdge) Cursor() graphql.ID {
	return c.cursor
}

func (c *CallEdge) Node() *Call {
	return c.node
}
