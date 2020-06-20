package invitation

import (
	"net/http"

	"github.com/go-chi/chi"
)

func SetRouter() http.Handler {
	handler := NewHandler()

	r := chi.NewRouter()
	r.Get("/{id}", handler.GetCode)
	return r
}
