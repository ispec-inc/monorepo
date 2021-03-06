package sentry

import (
	"time"

	"github.com/getsentry/sentry-go"
	"github.com/ispec-inc/go-distributed-monolith/pkg/applog/logger"
)

type Logger struct{}

type Options struct {
	Environment string
	DSN         string
	Debug       bool
}

func New(options Options) (*Logger, func(), error) {
	err := sentry.Init(sentry.ClientOptions{
		Dsn:         options.DSN,
		Environment: options.Environment,
		Debug:       options.Debug,
	})
	cleanup := func() { sentry.Flush(2 * time.Second) }
	return &Logger{}, cleanup, err
}

func (l *Logger) Error(user logger.User, err logger.Error) {
	sentry.WithScope(func(scope *sentry.Scope) {
		event := sentry.NewEvent()

		event.Level = sentry.LevelError
		event.User = sentry.User{
			ID:       user.ID,
			Username: user.Name,
		}
		event.Tags = map[string]string{"code": err.Code}
		event.Extra = map[string]interface{}{"message": err.Message}

		event.Exception = []sentry.Exception{{
			Value:      err.Message,
			Type:       err.ErrorType,
			Stacktrace: sentry.ExtractStacktrace(err.Error),
		}}

		sentry.CaptureEvent(event)
	})
}
