package main

import (
	"net/http"

	"github.com/go-chi/chi"

	"github.com/ispec-inc/go-distributed-monolith/cmd/api/adapter/account/invitation"
	"github.com/ispec-inc/go-distributed-monolith/pkg/registry"
)

func NewRouter(repo registry.Repository) http.Handler {
	r := chi.NewRouter()

	invitationHandler := invitation.NewHandler(repo)

	r = CommonMiddleware(r)

	r.Mount("/invitations", invitation.NewRouter(invitationHandler))

	return r
}
