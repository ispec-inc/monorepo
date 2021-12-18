package call

import (
	"context"

	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/resolver"
	uc "github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/uc/call"
)

type CallsByParticipant struct {
	Input struct {
		First  *int32
		After  *string
		Last   *int32
		Before *string
	}
}

func (a Adapter) CallsByParticipant(ctx context.Context, args CallsByParticipant) (*resolver.CallConnection, error) {

	list := uc.NewListByParticipant(a.registry)
	ipt := uc.ListByParticipantInput{
		//FIXME User ID
		UserID: 1,
	}
	opt, err := list.Do(ipt)
	if err != nil {
		return nil, err
	}

	rs := make([]*resolver.Call, len(opt.Calls))
	for i := range opt.Calls {
		rs[i] = resolver.NewCall(
			opt.Calls[i],
		)
	}

	conn := resolver.NewCallConnection(
		opt.Calls,
		opt.PageInfo.FirstID,
		opt.PageInfo.LastID,
		opt.PageInfo.TotalCount,
	)

	return &conn, err
}
