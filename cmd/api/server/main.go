package main

import (
	"net/http"

	"github.com/ispec-inc/go-distributed-monolith/pkg/applog"
	"github.com/ispec-inc/go-distributed-monolith/pkg/applog/logger"
	"github.com/ispec-inc/go-distributed-monolith/pkg/config"
	"github.com/ispec-inc/go-distributed-monolith/pkg/registry"
	"github.com/ispec-inc/go-distributed-monolith/pkg/sentry"
	"github.com/ispec-inc/go-distributed-monolith/pkg/stdlog"
)

func main() {
	repo, repoCleanup, err := registry.NewRepository()
	if err != nil {
		panic(err)
	}
	defer repoCleanup()

	var lgr logger.Logger
	switch config.App.Env {
	case config.EnvDev:
		lgr = stdlog.New()
	default:
		l, cleanup, err := sentry.New(
			sentry.Options{
				Environment: config.Sentry.DSN,
				DSN:         config.Sentry.DSN,
				Debug:       config.Sentry.Debug,
			},
		)
		if err != nil {
			panic(err)
		}
		lgr = l
		defer cleanup()
	}
	applog.Setup(lgr)

	r := NewRouter(repo)
	http.ListenAndServe(":9000", r)
}
