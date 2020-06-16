package invitation

import (
	"net/http"

	"github.com/go-chi/chi"
)

func SetRouter() http.Handler {
	r := chi.NewRouter()
	r.Get("/{id}", GetCodeHandler)
	return r
}
