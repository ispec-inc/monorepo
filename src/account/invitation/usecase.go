package invitation

import (
	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/repository"
)

type Usecase struct {
	invitationRepo repository.Invitation
}

func NewUsecase(invitationRepo repository.Invitation) Usecase {
	return Usecase{invitationRepo}
}

func (u Usecase) FindCode(input FindCodeInput) (
	FindCodeOutput, apperror.Error,
) {
	invitationCode, aerr := u.invitationRepo.Find(input.ID)
	if aerr != nil {
		return FindCodeOutput{}, aerr
	}

	return FindCodeOutput(invitationCode), nil
}

func (u Usecase) AddCode(input AddCodeInput) (AddCodeOutput, apperror.Error) {
	invitationCode, aerr := u.invitationRepo.Create(
		model.Invitation{
			UserID: input.UserID,
			Code:   input.Code,
		},
	)
	if aerr != nil {
		return AddCodeOutput{}, aerr
	}

	return AddCodeOutput(invitationCode), nil
}
