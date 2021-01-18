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
		scope.SetUser(sentry.User{
			ID:       user.ID,
			Username: user.Name,
		})
		scope.SetTags(map[string]string{
			"code": err.Code,
		})
		scope.SetExtra("message", err.Message)
		sentry.CaptureException(err.Err)
	})
}
