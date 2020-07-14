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

func (usecase Usecase) FindCode(input FindCodeInput) (FindCodeOutput, apperror.Error) {
	invitationCode, aerr := usecase.invitationRepo.Find(input.ID)
	if aerr != nil {
		return FindCodeOutput{}, aerr
	}

	return FindCodeOutput{
		ID:   invitationCode.ID,
		Code: invitationCode.Code,
	}, nil
}
