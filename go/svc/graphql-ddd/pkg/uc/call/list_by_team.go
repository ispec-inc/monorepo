package call

import (
	"github.com/ispec-inc/monorepo/go/pkg/applog"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/call"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/query"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/registry"
)

type ListByTeamInput struct {
	UserID user.ID
	First  *int32
	After  *string
	Last   *int32
	Before *string
}

type ListByTeamOutput struct {
	Calls    []call.Call
	PageInfo call.PaginationOutput
}

type ListByTeamUsecase struct {
	recoq query.Call
	page  call.PaginationService
	log   applog.AppLog
}

func NewListByTeam(rgst registry.Registry) ListByTeamUsecase {
	return ListByTeamUsecase{
		log:   applog.New(rgst.Logger().New()),
		page:  rgst.Service().NewCallPagination(),
		recoq: rgst.Repository().NewCallQuery(),
	}
}

func (u ListByTeamUsecase) Do(ipt ListByTeamInput) (*ListByTeamOutput, error) {
	args := call.PaginationArgs{
		First:  ipt.First,
		After:  ipt.After,
		Last:   ipt.Last,
		Before: ipt.Before,
	}
	page, err := u.page.ListByTeamUserID(ipt.UserID, args)
	if err != nil {
		return nil, err
	}

	rs, err := u.recoq.List(page.IDList)
	if err != nil {
		return nil, err
	}

	return &ListByTeamOutput{
		Calls:    *rs,
		PageInfo: *page,
	}, nil
}
