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
	lgr        applog.AppLog
}

func NewUsecase(rgst registry.Registry) Usecase {
	return Usecase{
		invitation: rgst.Repository().NewInvitation(),
		lgr:        applog.New(rgst.Logger().New()),
	}
}

func (u Usecase) FindCode(ctx context.Context, inp *FindCodeInput) (*FindCodeOutput, error) {
	inv, err := u.invitation.Find(inp.ID)
	if err != nil {
		u.lgr.Error(ctx, err)
		return nil, apperror.Wrap(err, "FindCode")
	}
	return &FindCodeOutput{
		Invitation: inv,
	}, nil
}

func (u Usecase) AddCode(ctx context.Context, inp *AddCodeInput) (*AddCodeOutput, error) {
	err := u.invitation.Create(inp.Invitation)
	if err != nil {
		u.lgr.Error(ctx, err)
		return nil, apperror.Wrap(err, "AddCode")
	}

	inv, err := u.invitation.FindByUserID(inp.Invitation.UserID)
	if err != nil {
		u.lgr.Error(ctx, err)
		return nil, apperror.Wrap(err, "AddCode")
	}
	return &AddCodeOutput{
		Invitation: inv,
	}, nil
}
