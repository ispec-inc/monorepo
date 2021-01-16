package logger

import (
	"context"

	"github.com/k0kubun/pp"
)

type localLogger struct{}

func NewLocal() Logger {
	return localLogger{}
}

func (r localLogger) SetUser(ctx context.Context, id, name string) context.Context {
	ctx = context.WithValue(ctx, userIDKey, id)
	ctx = context.WithValue(ctx, userNameKey, name)
	return ctx
}

func (r localLogger) Error(ctx context.Context, code, message string, err error) {
	errLog := errorLog{
		errCode:    code,
		errMessage: message,
	}
	if v := ctx.Value(userIDKey); v != nil {
		errLog.userID = v.(string)
	}
	if v := ctx.Value(userNameKey); v != nil {
		errLog.userName = v.(string)
	}

	pp.Println(errLog)
}

type errorLog struct {
	userID     string
	userName   string
	errCode    string
	errMessage string
}
