package middleware

import (
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"github.com/ispec-inc/monorepo/go/pkg/config"
)

func Common(r *chi.Mux) *chi.Mux {
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(config.Router.Timeout))
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: config.Router.AllowOrigins,
		AllowedMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{
			"Accept", "Accept-Language", "Authorization",
			"Content-Type", "X-CSRF-Token",
		},
		ExposedHeaders:   []string{"Link", "Authorization"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))
	return r
}
