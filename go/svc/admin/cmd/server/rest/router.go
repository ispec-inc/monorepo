package main

import (
	"net/http"

	"github.com/go-chi/chi"

	"github.com/ispec-inc/monorepo/go/pkg/presenter"
	v1 "github.com/ispec-inc/monorepo/go/svc/admin/pkg/controller/rest/v1"
)

func NewRouter() http.Handler {
	r := chi.NewRouter()
	r = commonMiddleware(r)

	r.Mount("/v1", v1.NewRouter())

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		presenter.Response(w, map[string]string{"messsage": "ok"})
	})

	return r
}
