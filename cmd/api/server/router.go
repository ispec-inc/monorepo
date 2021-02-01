package main

import (
	"net/http"

	"github.com/go-chi/chi"

	"github.com/ispec-inc/go-distributed-monolith/cmd/api/adapter/invitation"
	"github.com/ispec-inc/go-distributed-monolith/pkg/presenter"
	"github.com/ispec-inc/go-distributed-monolith/pkg/registry"
)

func NewRouter(repo registry.Repository) http.Handler {
	r := chi.NewRouter()

	r = commonMiddleware(r)

	r.Mount("/invitations", invitation.NewRouter(repo))

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		presenter.Response(w, map[string]string{"messsage": "ok"})
	})

	return r
}
