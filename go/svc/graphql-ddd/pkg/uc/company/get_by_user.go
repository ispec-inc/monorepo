package company

import (
	"github.com/ispec-inc/monorepo/go/pkg/applog"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/company"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/query"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/registry"
)

type GetByUserInput struct {
	UserID user.ID
}

type GetByUserOutput struct {
	Company company.Company
}

type GetByUserUseCase struct {
	compq query.Company
	log   applog.AppLog
}

func NewGetByUserUseCase(rgst registry.Registry) GetByUserUseCase {
	return GetByUserUseCase{
		log:   applog.New(rgst.Logger().New()),
		compq: rgst.Repository().NewCompanyQuery(),
	}
}

func (u GetByUserUseCase) Do(ipt GetByUserInput) (*GetByUserOutput, error) {
	c, err := u.compq.GetByUserID(ipt.UserID)
	if err != nil {
		return nil, err
	}

	return &GetByUserOutput{
		Company: *c,
	}, nil
}
