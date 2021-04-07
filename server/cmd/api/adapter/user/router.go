package user

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/ispec-inc/monorepo/server/pkg/registry"
)

func NewRouter(rgst registry.Registry) http.Handler {
	r := chi.NewRouter()
	h := NewHandler(rgst)

	r.Get("/{id}", h.GetCode)
	r.Post("/", h.AddCode)
	return r
}
