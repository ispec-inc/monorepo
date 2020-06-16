package main

import (
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"

	"github.com/ispec-inc/go-distributed-monolith/cmd/api/adapter/account/invitation"
	"github.com/ispec-inc/go-distributed-monolith/pkg/config"
)

func SetRouter() http.Handler {
	cfg := config.NewRouter()
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(time.Second * time.Duration(cfg.Timeout)))

	r.Mount("/invitation", invitation.SetRouter())
	return r
}
