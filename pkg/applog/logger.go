package applog

import (
	"context"
	"reflect"
	"strconv"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"github.com/ispec-inc/go-distributed-monolith/pkg/config"
	"github.com/ispec-inc/go-distributed-monolith/pkg/logger"
	"github.com/pkg/errors"
)

type Logger struct {
	logger logger.Logger
}

func Setup() (func() error, error) {
	var opt logger.Options
	switch config.App.Env {
	case config.EnvDev:
		opt = logger.Options{Type: logger.LogTypeStdout}
	default:
		opt = logger.Options{
			Type: logger.LogTypeSentry,
			SentryOptions: logger.SentryOptions{
				Environment: config.Sentry.DSN,
				DSN:         config.Sentry.DSN,
				Debug:       config.Sentry.Debug,
			},
		}
	}
	cleanup, err := logger.Setup(opt)
	return func() error { cleanup(); return nil }, err
}

func New() Logger {
	return Logger{
		logger: logger.New(),
	}
}

func (l Logger) SetUser(ctx context.Context, userID int64, userName string) context.Context {
	ctx = context.WithValue(ctx, userIDKey, strconv.FormatInt(userID, 10))
	ctx = context.WithValue(ctx, userNameKey, userName)
	return ctx
}

func (l Logger) Error(ctx context.Context, err error) {
	lerr := logger.Error{Error: err}
	if aerr := apperror.Unwrap(err); aerr == nil {
		lerr.Message = err.Error()
		lerr.ErrorType = reflect.TypeOf(errors.Cause(err)).String()
	} else {
		lerr.Code = aerr.Code().String()
		lerr.Message = aerr.Error()
		lerr.ErrorType = reflect.TypeOf(aerr).String()
	}

	var user logger.User
	if v := ctx.Value(userIDKey); v != nil {
		user.ID = v.(string)
	}
	if v := ctx.Value(userNameKey); v != nil {
		user.Name = v.(string)
	}

	l.logger.Error(user, lerr)
}
