package invitation

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"
	"github.com/go-playground/validator"

	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
	"github.com/ispec-inc/go-distributed-monolith/pkg/presenter"
	"github.com/ispec-inc/go-distributed-monolith/pkg/registry"
	"github.com/ispec-inc/go-distributed-monolith/pkg/view"
	"github.com/ispec-inc/go-distributed-monolith/src/invitation"
)

type Handler struct {
	usecase invitation.Usecase
}

func NewHandler(rgst registry.Registry) Handler {
	usecase := invitation.NewUsecase(rgst)
	return Handler{usecase}
}

func (h Handler) GetCode(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		presenter.BadRequestError(w, err)
		return
	}

	inp := &invitation.FindCodeInput{
		ID: int64(id),
	}
	out, aerr := h.usecase.FindCode(r.Context(), inp)
	if aerr != nil {
		presenter.ApplicationException(w, aerr)
		return
	}

	invres := view.NewInvitationCode(out.Invitation)
	res := GetCodeResponse{
		InvitationCode: invres,
	}
	presenter.Response(w, res)
}

func (h Handler) AddCode(w http.ResponseWriter, r *http.Request) {
	var request addCodeRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		presenter.BadRequestError(w, err)
		return
	}
	validate := validator.New()
	if err := validate.Struct(request); err != nil {
		presenter.BadRequestError(w, err)
		return
	}

	inv := model.Invitation{
		UserID: request.UserID,
		Code:   request.Code,
	}
	inp := &invitation.AddCodeInput{
		Invitation: inv,
	}
	out, aerr := h.usecase.AddCode(r.Context(), inp)
	if aerr != nil {
		presenter.ApplicationException(w, aerr)
		return
	}

	invres := view.NewInvitationCode(out.Invitation)
	res := AddCodeResponse{
		InvitationCode: invres,
	}
	presenter.Response(w, res)
}
