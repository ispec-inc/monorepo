package applog

import "context"

type (
	ctxkey string

	testModeValue struct{}
)

const (
	userIDKey   ctxkey = "report_user_id"
	userNameKey ctxkey = "report_user_name"

	testModeKey ctxkey = "test_mode"
)

func WithTestContext(ctx context.Context) context.Context {
	if ctx == nil {
		ctx = context.Background()
	}
	return context.WithValue(ctx, testModeKey, testModeValue{})
}
