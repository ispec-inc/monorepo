package logger

import "context"

type Logger interface {
	SetUser(ctx context.Context, id, name string) context.Context
	Error(ctx context.Context, code, msg string, err error)
}
