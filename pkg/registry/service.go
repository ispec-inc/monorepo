package registry

import (
	"github.com/ispec-inc/go-distributed-monolith/pkg/config"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/service"
	infra_logger "github.com/ispec-inc/go-distributed-monolith/pkg/infra/logger"
	"github.com/ispec-inc/go-distributed-monolith/pkg/logger"
)

type Service struct{}

func NewService() (Service, func() error, error) {
	var logOpt logger.Options
	switch config.App.Env {
	case config.EnvDev:
		logOpt = logger.Options{Type: logger.LogTypeStdout}
	default:
		logOpt = logger.Options{
			Type: logger.LogTypeSentry,
			SentryOptions: logger.SentryOptions{
				Environment: config.Sentry.DSN,
				DSN:         config.Sentry.DSN,
				Debug:       config.Sentry.Debug,
			},
		}
	}
	logCleanup, err := logger.Setup(logOpt)
	if err != nil {
		return Service{}, func() error { return nil }, err
	}

	s := Service{}
	cleanup := func() error {
		logCleanup()
		return nil
	}
	return s, cleanup, nil
}

func (s Service) NewLogger() service.Logger {
	return infra_logger.NewLogger(logger.New())
}
