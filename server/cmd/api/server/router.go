package main

import (
	"net/http"

	"github.com/go-chi/chi"

	"github.com/ispec-inc/monorepo/server/cmd/api/adapter/user"
	"github.com/ispec-inc/monorepo/server/pkg/presenter"
	"github.com/ispec-inc/monorepo/server/pkg/registry"
)

func NewRouter(rgst registry.Registry) http.Handler {
	r := chi.NewRouter()

	r = commonMiddleware(r)

	r.Mount("/users", user.NewRouter(rgst))

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		presenter.Response(w, map[string]string{"messsage": "ok"})
	})

	return r
}