package invitation

import (
	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/repository"
	"github.com/ispec-inc/go-distributed-monolith/pkg/registry"
)

type Usecase struct {
	invitation repository.Invitation
}

func NewUsecase(repo registry.Repository) Usecase {
	return Usecase{
		invitation: repo.NewInvitation(),
	}
}

func (u Usecase) FindCode(inp FindCodeInput) (out FindCodeOutput, aerr apperror.Error) {
	inv, aerr := u.invitation.Find(inp.ID)
	if aerr != nil {
		return
	}
	out.Invitation = inv
	return out, nil
}

func (u Usecase) AddCode(inp AddCodeInput) (out AddCodeOutput, aerr apperror.Error) {
	aerr = u.invitation.Create(inp.Invitation)
	if aerr != nil {
		return
	}

	inv, aerr := u.invitation.FindByUserID(inp.Invitation.UserID)
	if aerr != nil {
		return
	}
	out.Invitation = inv

	return out, nil
}
