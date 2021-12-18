package call

import "github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/call"

type Call interface {
	Create(*call.Call) error
}

type CallStatus interface {
	Save(*call.Call) error
}
