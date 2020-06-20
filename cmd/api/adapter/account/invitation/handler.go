package invitation

import (
	"encoding/json"
	"github.com/go-chi/chi"
	"net/http"
	"strconv"

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
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	output, aerr := h.usecase.FindCode(invitation.Input{ID: int64(id)})
	if aerr != nil {
		http.Error(w, aerr.Message(), presenter.CodeStatuses[aerr.Code()])
		return
	}

	response, err := json.Marshal(InvitationCodeResponse{
		ID:             output.ID,
		InvitationCode: output.Code,
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(response))
}
