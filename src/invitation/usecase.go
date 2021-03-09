package invitation

import (
	"context"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"github.com/ispec-inc/go-distributed-monolith/pkg/applog"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/repository"
	"github.com/ispec-inc/go-distributed-monolith/pkg/registry"
)

type Usecase struct {
	invitation repository.Invitation
	log        applog.AppLog
}

func NewUsecase(rgst registry.Registry) Usecase {
	return Usecase{
		invitation: rgst.Repository().NewInvitation(),
		log:        applog.New(rgst.Logger().New()),
	}
}

func (u Usecase) FindCode(ctx context.Context, inp *FindCodeInput) (*FindCodeOutput, error) {
	inv, err := u.invitation.Find(inp.ID)
	if err != nil {
		err = apperror.Wrap(err, "FindCode")
		u.log.Error(ctx, err)
		return nil, err
	}
	return &FindCodeOutput{
		Invitation: inv,
	}, nil
}

func (u Usecase) AddCode(ctx context.Context, inp *AddCodeInput) (*AddCodeOutput, error) {
	err := u.invitation.Create(inp.Invitation)
	if err != nil {
		err = apperror.Wrap(err, "AddCode")
		u.log.Error(ctx, err)
		return nil, err
	}

	inv, err := u.invitation.FindByUserID(inp.Invitation.UserID)
	if err != nil {
		err = apperror.Wrap(err, "AddCode")
		u.log.Error(ctx, err)
		return nil, err
	}
	return &AddCodeOutput{
		Invitation: inv,
	}, nil
}
