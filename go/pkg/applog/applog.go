package applog

import (
	"context"
	"reflect"
	"strconv"

	"github.com/ispec-inc/monorepo/go/pkg/apperror"
	"github.com/ispec-inc/monorepo/go/pkg/applog/logger"
	"github.com/pkg/errors"
)

type AppLog struct {
	lgr logger.Logger
}

func New(l logger.Logger) AppLog {
	return AppLog{
		lgr: l,
	}
}

func (l AppLog) SetUser(ctx context.Context, userID int64, userName string) context.Context {
	ctx = context.WithValue(ctx, userIDKey, strconv.FormatInt(userID, 10))
	ctx = context.WithValue(ctx, userNameKey, userName)
	return ctx
}

func (l AppLog) Error(ctx context.Context, err error) {
	if v := ctx.Value(testModeKey); v != nil {
		return
	}

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

	l.lgr.Error(user, lerr)
}
