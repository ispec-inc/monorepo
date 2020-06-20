package main

import (
	"net/http"

	"github.com/go-chi/chi"

	"github.com/ispec-inc/go-distributed-monolith/cmd/api/adapter/account/invitation"
)

func SetRouter() http.Handler {
	r := chi.NewRouter()
	r = Middleware(r)
	r.Mount("/invitation", invitation.SetRouter())
	return r
}
