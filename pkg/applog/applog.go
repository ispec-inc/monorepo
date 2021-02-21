package applog

import (
	"context"
	"reflect"
	"strconv"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"github.com/ispec-inc/go-distributed-monolith/pkg/applog/logger"
	"github.com/pkg/errors"
)

var lgr logger.Logger

func Setup(l logger.Logger) {
	lgr = l
}

func SetUser(ctx context.Context, userID int64, userName string) context.Context {
	ctx = context.WithValue(ctx, userIDKey, strconv.FormatInt(userID, 10))
	ctx = context.WithValue(ctx, userNameKey, userName)
	return ctx
}

func TestContext() context.Context {
	ctx := context.Background()
	ctx = context.WithValue(ctx, testModeKey, true)
	return ctx
}

func LogError(ctx context.Context, err error) {
	if v := ctx.Value(testModeKey); v != nil && v.(bool) {
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

	lgr.Error(user, lerr)
}
