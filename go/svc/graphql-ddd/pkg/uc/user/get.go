package user

import (
	"github.com/ispec-inc/monorepo/go/pkg/applog"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/query"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/registry"
)

type GetUseCase struct {
	userq query.User
	log   applog.AppLog
}

type GetInput struct {
	UserID user.ID
}

type GetOutput struct {
	User user.User
}

func NewGetUseCase(rgst registry.Registry) GetUseCase {
	return GetUseCase{
		log:   applog.New(rgst.Logger().New()),
		userq: rgst.Repository().NewUserQuery(),
	}
}

func (g GetUseCase) Do(ipt GetInput) (*GetOutput, error) {
	u, err := g.userq.Get(ipt.UserID)
	if err != nil {
		return nil, err
	}

	return &GetOutput{
		User: *u,
	}, nil
}
