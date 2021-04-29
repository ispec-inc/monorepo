package v1

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/ispec-inc/monorepo/go/svc/admin/pkg/controller/rest/v1/article"
)

func NewRouter() http.Handler {
	r := chi.NewRouter()

	r.Mount("/articles", article.New())

	return r
}
