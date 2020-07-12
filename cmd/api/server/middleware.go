package main

import (
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"

	"github.com/ispec-inc/go-distributed-monolith/pkg/config"
)

func CommonMiddleware(r *chi.Mux) *chi.Mux {
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(time.Second * time.Duration(config.Router.Timeout)))
	return r
}
