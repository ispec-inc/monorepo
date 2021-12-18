package call

import (
	"github.com/ispec-inc/monorepo/go/pkg/applog"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/call"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/query"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/registry"
)

type GetUseCase struct {
	callq query.Call
	log   applog.AppLog
}

type GetInput struct {
	CallID call.ID
}

type GetOutput struct {
	Call call.Call
}

func NewGetUseCase(rgst registry.Registry) GetUseCase {
	return GetUseCase{
		log:   applog.New(rgst.Logger().New()),
		callq: rgst.Repository().NewCallQuery(),
	}
}

func (u GetUseCase) Do(ipt GetInput) (*GetOutput, error) {
	r, err := u.callq.Get(ipt.CallID)
	if err != nil {
		return nil, err
	}

	return &GetOutput{
		Call: *r,
	}, nil
}
