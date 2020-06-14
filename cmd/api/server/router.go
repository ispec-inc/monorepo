package main

import (
	"net/http"

	"github.com/go-chi/chi"

	"github.com/ispec-inc/go-project-template/cmd/api/adapter/account/invitation"
)

func SetRouter() http.Handler {
	r := chi.NewRouter()
	r.Mount("/invitation", invitation.SetRouter())
	return r
}
