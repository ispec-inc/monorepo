package invitation

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/repository"
)

type Usecase struct {
	invitationRepo repository.Invitation
}

func NewUsecase(invitationRepo repository.Invitation) Usecase {
	return Usecase{invitationRepo}
}

func (usecase Usecase) FindCode(input Input) (Output, apperror.Error) {
	invitationCode, err := usecase.invitationRepo.Find(input.ID)
	if err != nil {
		return Output{}, apperror.New(http.StatusInternalServerError, err)
	}
	if invitationCode.ID == 0 {
		return Output{}, apperror.New(
			http.StatusNotFound,
			errors.New(fmt.Sprintf("invitation code (id = %d) is not found.", input.ID)),
		)
	}
	return Output{
		ID:   invitationCode.ID,
		Code: invitationCode.Code,
	}, nil
}
