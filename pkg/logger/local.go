package logger

import (
	"context"
	"log"
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
	var uid, uname string
	if v := ctx.Value(userIDKey); v != nil {
		uid = v.(string)
	}
	if v := ctx.Value(userNameKey); v != nil {
		uname = v.(string)
	}

	log.Printf(
		"[Exception] User(id:%s, name:%s) Error(code:%s, message:%s)\n",
		uid, uname, code, message,
	)
}
