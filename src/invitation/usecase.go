package invitation

import (
	"context"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/repository"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/service"
	"github.com/ispec-inc/go-distributed-monolith/pkg/registry"
)

type Usecase struct {
	invitation repository.Invitation
	logger     service.Logger
}

func NewUsecase(repo registry.Repository, srvc registry.Service) Usecase {
	return Usecase{
		invitation: repo.NewInvitation(),
		logger:     srvc.NewLogger(),
	}
}

func (u Usecase) FindCode(ctx context.Context, inp FindCodeInput) (out FindCodeOutput, aerr apperror.Error) {
	inv, aerr := u.invitation.Find(inp.ID)
	if aerr != nil {
		u.logger.Error(ctx, aerr)
		return
	}
	out.Invitation = inv
	return out, nil
}

func (u Usecase) AddCode(ctx context.Context, inp AddCodeInput) (out AddCodeOutput, aerr apperror.Error) {
	aerr = u.invitation.Create(inp.Invitation)
	if aerr != nil {
		u.logger.Error(ctx, aerr)
		return
	}

	inv, aerr := u.invitation.FindByUserID(inp.Invitation.UserID)
	if aerr != nil {
		u.logger.Error(ctx, aerr)
		return
	}
	out.Invitation = inv

	return out, nil
}
