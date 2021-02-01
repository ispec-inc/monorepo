package logger

import (
	"time"

	"github.com/getsentry/sentry-go"
)

type sentryLogger struct{}

func newSentryLogger(options SentryOptions) (*sentryLogger, func(), error) {
	err := sentry.Init(sentry.ClientOptions{
		Dsn:         options.DSN,
		Environment: options.Environment,
		Debug:       options.Debug,
	})
	cleanup := func() { sentry.Flush(2 * time.Second) }
	return &sentryLogger{}, cleanup, err
}

func (l *sentryLogger) Error(user User, err Error) {
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
