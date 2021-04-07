package user

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"
	"github.com/go-playground/validator"

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

func (h Handler) Get(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		presenter.BadRequestError(w, err)
		return
	}

	opt, aerr := h.usecase.Get(r.Context(), &user.GetInput{
		ID: int64(id),
	})
	if aerr != nil {
		presenter.ApplicationException(w, aerr)
		return
	}

	presenter.Response(w, view.NewUser(opt.User))
}

func (h Handler) Create(w http.ResponseWriter, r *http.Request) {
	body := &createRequest{}
	if err := json.NewDecoder(r.Body).Decode(body); err != nil {
		presenter.BadRequestError(w, err)
		return
	}
	validate := validator.New()
	if err := validate.Struct(body); err != nil {
		presenter.BadRequestError(w, err)
		return
	}

	opt, aerr := h.usecase.Create(r.Context(), &user.CreateInput{
		Name:        body.Name,
		Description: body.Description,
		Email:       body.Email,
	})
	if aerr != nil {
		presenter.ApplicationException(w, aerr)
		return
	}

	presenter.Response(w, view.NewUsers(opt.Users))
}
