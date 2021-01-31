package invitation

import (
	"context"

	"github.com/ispec-inc/go-distributed-monolith/pkg/applog"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/repository"
	"github.com/ispec-inc/go-distributed-monolith/pkg/registry"
)

type Usecase struct {
	invitation repository.Invitation
	logger     applog.Logger
}

func NewUsecase(repo registry.Repository) Usecase {
	return Usecase{
		invitation: repo.NewInvitation(),
		logger:     applog.New(),
	}
}

func (u Usecase) FindCode(ctx context.Context, inp FindCodeInput) (out FindCodeOutput, aerr error) {
	inv, aerr := u.invitation.Find(inp.ID)
	if aerr != nil {
		u.logger.Error(ctx, aerr)
		return
	}
	out.Invitation = inv
	return out, nil
}

func (u Usecase) AddCode(ctx context.Context, inp AddCodeInput) (out AddCodeOutput, err error) {
	err = u.invitation.Create(inp.Invitation)
	if err != nil {
		u.logger.Error(ctx, err)
		return
	}

	inv, err := u.invitation.FindByUserID(inp.Invitation.UserID)
	if err != nil {
		u.logger.Error(ctx, err)
		return
	}
	out.Invitation = inv

	return out, nil
}
