package logger

import (
	"github.com/k0kubun/pp"
)

type stdoutLogger struct{}

func newStdoutLogger() *stdoutLogger {
	return &stdoutLogger{}
}

func (l *stdoutLogger) Error(user User, err Error) {
	pp.Println(errorLog{
		userID:     user.ID,
		userName:   user.Name,
		errCode:    err.Code,
		errMessage: err.Message,
	})
}

type errorLog struct {
	userID     string
	userName   string
	errCode    string
	errMessage string
}
