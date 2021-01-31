package invitation

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/ispec-inc/go-distributed-monolith/pkg/registry"
)

func NewRouter(repo registry.Repository) http.Handler {
	r := chi.NewRouter()
	h := NewHandler(repo)

	r.Get("/{id}", h.GetCode)
	r.Post("/", h.AddCode)
	return r
}
