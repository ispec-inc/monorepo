package main

import (
	"net/http"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apphttp"
	"github.com/ispec-inc/go-distributed-monolith/pkg/config"
	"github.com/ispec-inc/go-distributed-monolith/pkg/logger"
	"github.com/ispec-inc/go-distributed-monolith/pkg/registry"
)

func main() {
	repo, cleanup := registry.NewRepository()
	defer cleanup()

	var loggerCleanup func()
	switch config.App.Env {
	case config.EnvDev:
		apphttp.Logger = logger.NewLocal()
	default:
		apphttp.Logger, loggerCleanup = logger.NewSentry(config.Sentry.DSN, config.Sentry.Env, config.Sentry.Debug)
	}
	defer loggerCleanup()

	r := NewRouter(repo)
	http.ListenAndServe(":9000", r)
}
