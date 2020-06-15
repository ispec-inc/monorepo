package main

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"

	"github.com/ispec-inc/go-distributed-monolith/cmd/api/adapter/account/invitation"
)

func SetRouter() http.Handler {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Mount("/invitation", invitation.SetRouter())
	return r
}
