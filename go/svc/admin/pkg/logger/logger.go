package logger

import (
	"github.com/ispec-inc/monorepo/go/pkg/applog/logger"
	"github.com/ispec-inc/monorepo/go/pkg/sentry"
	"github.com/ispec-inc/monorepo/go/pkg/stdlog"
	"github.com/ispec-inc/monorepo/go/svc/admin/pkg/config"
)

var lgr logger.Logger

func Init() (func() error, error) {
	var (
		cleanup func()
		err     error
	)

	switch "TODO" { // TODO:
	case "TODO":
		lgr = stdlog.New()
		return func() error { return nil }, nil
	default:
		lgr, cleanup, err = sentry.New(
			sentry.Config{
				Environment: config.Sentry.Env,
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
