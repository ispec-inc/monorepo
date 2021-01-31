package applog

const (
	userIDKey   ctxkey = "report_user_id"
	userNameKey ctxkey = "report_user_name"

	testModeKey ctxkey = "test_mode"
)

type ctxkey string
