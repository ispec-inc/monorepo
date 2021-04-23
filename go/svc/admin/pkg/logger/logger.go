package logger

import (
	"github.com/ispec-inc/monorepo/go/pkg/applog/logger"
	"github.com/ispec-inc/monorepo/go/pkg/config"
	"github.com/ispec-inc/monorepo/go/pkg/sentry"
	"github.com/ispec-inc/monorepo/go/pkg/stdlog"
)

var lgr logger.Logger

func Init() (func() error, error) {
	var (
		cleanup func()
		err     error
	)

	switch config.App.Env {
	case config.EnvDev:
		lgr = stdlog.New()
		return func() error { return nil }, nil
	default:
		lgr, cleanup, err = sentry.New(
			sentry.Options{
				Environment: config.Sentry.DSN,
				DSN:         config.Sentry.DSN,
				Debug:       config.Sentry.Debug,
			},
		)
		return func() error { cleanup(); return nil }, err
	}
}

func Get() logger.Logger {
	return lgr
}
