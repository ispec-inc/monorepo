package invitation

import (
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

func NewHandler() handler {
	usecase := registry.NewInvitationUsecase()
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
		http.Error(w, aerr.Message(), presenter.CodeStatuses[aerr.Code()])
		presenter.ApplicationException(w, aerr)
		return
	}

	presenter.Response(w, InvitationCodeResponse{
		ID:             output.ID,
		InvitationCode: output.Code,
	})
}
