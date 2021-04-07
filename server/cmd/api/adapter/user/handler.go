package user

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"
	"github.com/go-playground/validator"

	"github.com/ispec-inc/monorepo/server/pkg/domain/model"
	"github.com/ispec-inc/monorepo/server/pkg/presenter"
	"github.com/ispec-inc/monorepo/server/pkg/registry"
	"github.com/ispec-inc/monorepo/server/pkg/view"
	"github.com/ispec-inc/monorepo/server/src/user"
)

type Handler struct {
	usecase user.Usecase
}

func NewHandler(rgst registry.Registry) Handler {
	usecase := user.NewUsecase(rgst)
	return Handler{usecase}
}

func (h Handler) GetCode(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		presenter.BadRequestError(w, err)
		return
	}

	inp := &user.FindCodeInput{
		ID: int64(id),
	}
	out, aerr := h.usecase.FindCode(r.Context(), inp)
	if aerr != nil {
		presenter.ApplicationException(w, aerr)
		return
	}

	invres := view.NewUserCode(out.User)
	res := GetCodeResponse{
		UserCode: invres,
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

	inv := model.User{
		UserID: request.UserID,
		Code:   request.Code,
	}
	inp := &user.AddCodeInput{
		User: inv,
	}
	out, aerr := h.usecase.AddCode(r.Context(), inp)
	if aerr != nil {
		presenter.ApplicationException(w, aerr)
		return
	}

	invres := view.NewUserCode(out.User)
	res := AddCodeResponse{
		UserCode: invres,
	}
	presenter.Response(w, res)
}
