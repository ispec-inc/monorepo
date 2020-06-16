package invitation

import (
	"encoding/json"
	"github.com/go-chi/chi"
	"net/http"
	"strconv"

	"github.com/ispec-inc/go-distributed-monolith/pkg/registry"
	"github.com/ispec-inc/go-distributed-monolith/src/account/invitation"
)

func GetCodeHandler(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	usecase := registry.NewInvitationUseCase()
	output, aerr := usecase.FindCode(invitation.Input{ID: int64(id)})
	if aerr != nil {
		http.Error(w, aerr.Message(), aerr.Status())
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
