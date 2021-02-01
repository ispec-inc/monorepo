package main

import (
	"net/http"

	"github.com/go-chi/chi"

	"github.com/ispec-inc/go-distributed-monolith/cmd/api/adapter/invitation"
	"github.com/ispec-inc/go-distributed-monolith/pkg/apphttp"
	"github.com/ispec-inc/go-distributed-monolith/pkg/registry"
)

func NewRouter(repo registry.Repository) http.Handler {
	r := chi.NewRouter()

	invitationHandler := invitation.NewHandler(repo)

	r = commonMiddleware(r)

	r.Mount("/invitations", invitation.NewRouter(invitationHandler))
	r.Get("/health", apphttp.Wrap(func(w apphttp.ResponseWriter, r *http.Request) {
		w.WriteResponse(map[string]string{"messsage": "ok"})
	}))

	return r
}
