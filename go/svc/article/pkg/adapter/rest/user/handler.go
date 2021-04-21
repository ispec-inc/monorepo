package user

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"
	pb "github.com/ispec-inc/monorepo/go/gen/article/api/user"
	"github.com/ispec-inc/monorepo/go/pkg/presenter"
	"github.com/ispec-inc/monorepo/go/svc/article/pkg/registry"
	"github.com/ispec-inc/monorepo/go/svc/article/pkg/view"
	"github.com/ispec-inc/monorepo/go/svc/article/src/user"
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

	presenter.Response(w, &pb.GetResponse{
		User: view.NewUser(opt.User),
	})
}

func (h Handler) Create(w http.ResponseWriter, r *http.Request) {
	body := &pb.CreateRequest{}
	if err := json.NewDecoder(r.Body).Decode(body); err != nil {
		presenter.BadRequestError(w, err)
		return
	}
	if err := body.Validate(true); err != nil {
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

	presenter.Response(w, &pb.CreateResponse{
		Users: view.NewUsers(opt.Users),
	})
}
