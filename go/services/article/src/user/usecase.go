package user

import (
	"context"

	"github.com/ispec-inc/monorepo/go/pkg/apperror"
	"github.com/ispec-inc/monorepo/go/pkg/applog"
	"github.com/ispec-inc/monorepo/go/pkg/domain/model"
	"github.com/ispec-inc/monorepo/go/pkg/domain/repository"
	"github.com/ispec-inc/monorepo/go/pkg/registry"
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

func (u Usecase) Get(ctx context.Context, ipt *GetInput) (*GetOutput, error) {
	user, err := u.user.Get(ipt.ID)
	if err != nil {
		err = apperror.Wrap(err, "Get")
		u.log.Error(ctx, err)
		return nil, err
	}
	return &GetOutput{
		User: user,
	}, nil
}

func (u Usecase) Create(ctx context.Context, ipt *CreateInput) (*CreateOutput, error) {
	err := u.user.Create(&model.User{
		Name:        ipt.Name,
		Description: ipt.Description,
		Email:       ipt.Email,
	})
	if err != nil {
		err = apperror.Wrap(err, "Create")
		u.log.Error(ctx, err)
		return nil, err
	}

	users, err := u.user.List(nil)
	if err != nil {
		err = apperror.Wrap(err, "Create")
		u.log.Error(ctx, err)
		return nil, err
	}

	return &CreateOutput{
		Users: users,
	}, nil
}
