package user

import (
	"context"

	"github.com/ispec-inc/monorepo/server/pkg/apperror"
	"github.com/ispec-inc/monorepo/server/pkg/applog"
	"github.com/ispec-inc/monorepo/server/pkg/domain/repository"
	"github.com/ispec-inc/monorepo/server/pkg/registry"
)

type Usecase struct {
	user repository.User
	log  applog.AppLog
}

func NewUsecase(rgst registry.Registry) Usecase {
	return Usecase{
		user: rgst.Repository().NewUser(),
		log:  applog.New(rgst.Logger().New()),
	}
}

func (u Usecase) FindCode(ctx context.Context, inp *FindCodeInput) (*FindCodeOutput, error) {
	inv, err := u.user.Find(inp.ID)
	if err != nil {
		err = apperror.Wrap(err, "FindCode")
		u.log.Error(ctx, err)
		return nil, err
	}
	return &FindCodeOutput{
		User: inv,
	}, nil
}

func (u Usecase) AddCode(ctx context.Context, inp *AddCodeInput) (*AddCodeOutput, error) {
	err := u.user.Create(inp.User)
	if err != nil {
		err = apperror.Wrap(err, "AddCode")
		u.log.Error(ctx, err)
		return nil, err
	}

	inv, err := u.user.FindByUserID(inp.User.UserID)
	if err != nil {
		err = apperror.Wrap(err, "AddCode")
		u.log.Error(ctx, err)
		return nil, err
	}
	return &AddCodeOutput{
		User: inv,
	}, nil
}
