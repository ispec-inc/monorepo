package query

import (
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/call"
)

type Call interface {
	Get(call.ID) (*call.Call, error)
	List([]call.ID) (*[]call.Call, error)
}
