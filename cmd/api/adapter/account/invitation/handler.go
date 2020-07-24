package invitation

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"

	"github.com/ispec-inc/go-distributed-monolith/pkg/presenter"
	"github.com/ispec-inc/go-distributed-monolith/pkg/registry"
	"github.com/ispec-inc/go-distributed-monolith/src/account/invitation"
)

type handler struct {
	usecase invitation.Usecase
}

func NewHandler(repo registry.Repository) handler {
	usecase := invitation.NewUsecase(repo.NewInvitation())
	return handler{usecase}
}

func (h handler) GetCode(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		presenter.BadRequestError(w, err)
		return
	}

	output, aerr := h.usecase.FindCode(invitation.FindCodeInput{ID: int64(id)})
	if aerr != nil {
		presenter.ApplicationException(w, aerr)
		return
	}

	presenter.Encode(w, getCodeResponse{
		ID:             output.ID,
		UserID:         output.UserID,
		InvitationCode: output.Code,
	})
}

func (h handler) AddCode(w http.ResponseWriter, r *http.Request) {
	var request addCodeRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		presenter.BadRequestError(w, err)
		return
	}
	if err := request.validate(); err != nil {
		presenter.BadRequestError(w, err)
		return
	}

	output, aerr := h.usecase.AddCode(
		invitation.AddCodeInput{
			UserID: request.UserID,
			Code:   request.Code,
		},
	)
	if aerr != nil {
		presenter.ApplicationException(w, aerr)
		return
	}

	presenter.Encode(w, addCodeResponse{
		ID:             output.ID,
		UserID:         output.UserID,
		InvitationCode: output.Code,
	})
}
