package invitation

import (
	"net/http"

	"github.com/go-chi/chi"
)

func NewRouter(handler handler) http.Handler {
	r := chi.NewRouter()
	r.Get("/{id}", handler.GetCode)
	r.Post("/", handler.AddCode)
	return r
}
