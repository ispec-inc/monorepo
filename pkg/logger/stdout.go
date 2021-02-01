package logger

import (
	"fmt"

	"github.com/k0kubun/pp"
)

type stdoutLogger struct{}

func newStdoutLogger() *stdoutLogger {
	return &stdoutLogger{}
}

func (l *stdoutLogger) Error(user User, err Error) {
	fmt.Println("=================== ERROR ===================")
	fmt.Println("INFO: ")
	pp.Println(struct {
		User  User
		Error errorLog
	}{
		User: user,
		Error: errorLog{
			Code:    err.Code,
			Message: err.Message,
			Type:    err.ErrorType,
		},
	})
	fmt.Printf("STACK TRACE: \n%+v\n", err.Error)
	fmt.Println("=============================================")
}

type errorLog struct {
	Code    string
	Message string
	Type    string
}
