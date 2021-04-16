package stdlog

import (
	"fmt"

	"github.com/ispec-inc/monorepo/go/pkg/applog/logger"
	"github.com/k0kubun/pp"
)

type Logger struct{}

func New() *Logger {
	return &Logger{}
}

func (l *Logger) Error(user logger.User, err logger.Error) {
	fmt.Println("=================== ERROR ===================")
	fmt.Println("INFO: ")
	pp.Println(struct {
		User  logger.User
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
