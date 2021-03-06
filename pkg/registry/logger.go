package registry

import (
	"github.com/ispec-inc/go-distributed-monolith/pkg/applog/logger"
	"github.com/ispec-inc/go-distributed-monolith/pkg/config"
	"github.com/ispec-inc/go-distributed-monolith/pkg/sentry"
	"github.com/ispec-inc/go-distributed-monolith/pkg/stdlog"
)

type Logger struct {
	lgr logger.Logger
}

func NewLogger() (Logger, func() error, error) {
	var (
		lgr     logger.Logger
		clenaup func() error
		err     error
	)

	switch config.App.Env {
	case config.EnvDev:
		lgr = stdlog.New()
	default:
		slgr, scleanup, serr := sentry.New(
			sentry.Options{
				Environment: config.Sentry.DSN,
				DSN:         config.Sentry.DSN,
				Debug:       config.Sentry.Debug,
			},
		)
		lgr = slgr
		clenaup = func() error { scleanup(); return nil }
		err = serr
	}

	return Logger{lgr}, clenaup, err
}

func (l Logger) New() logger.Logger {
	return l.lgr
}
