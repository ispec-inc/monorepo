package invitation

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/ispec-inc/go-distributed-monolith/pkg/apphttp"
)

func NewRouter(handler handler) http.Handler {
	r := chi.NewRouter()
	r.Get("/{id}", apphttp.Wrap(handler.GetCode))
	r.Post("/", apphttp.Wrap(handler.AddCode))
	return r
}
