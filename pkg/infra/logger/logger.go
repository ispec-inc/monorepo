package logger

import (
	"context"
	"reflect"
	"strconv"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"github.com/ispec-inc/go-distributed-monolith/pkg/logger"
	"github.com/pkg/errors"
)

type Logger struct {
	logger logger.Logger
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
