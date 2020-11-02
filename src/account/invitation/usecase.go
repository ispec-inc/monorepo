package invitation

import (
	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/repository"
)

type Usecase struct {
	invitationRepo repository.Invitation
}

func NewUsecase(invitationRepo repository.Invitation) Usecase {
	return Usecase{invitationRepo}
}

func (u Usecase) FindCode(inp FindCodeInput) (out FindCodeOutput, aerr apperror.Error) {
	inv, aerr := u.invitationRepo.Find(inp.ID)
	if aerr != nil {
		return
	}
	out.Invitation = inv
	return out, nil
}

func (u Usecase) AddCode(inp AddCodeInput) (out AddCodeOutput, aerr apperror.Error) {
	aerr = u.invitationRepo.Create(inp.Invitation)
	if aerr != nil {
		return
	}

	inv, aerr := u.invitationRepo.FindByUserID(inp.Invitation.UserID)
	if aerr != nil {
		return
	}
	out.Invitation = inv

	return out, nil
}
