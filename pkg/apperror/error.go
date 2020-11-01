package apperror

import (
	"github.com/jinzhu/gorm"
)

type Code string

var CodeError Code = "error"
var CodeInvalid Code = "invalid"
var CodeSuccess Code = "sucess"
var CodeNotFound Code = "not found"

type Error interface {
	Code() Code
	Message() string
}

type AppError struct {
	code    Code
	err     error
	message string
}

func New(code Code, err error) AppError {
	return AppError{
		code:    code,
		err:     err,
		message: err.Error(),
	}
}

func NewGorm(err error, msg string) AppError {
	switch err {
	case gorm.ErrRecordNotFound:
		return AppError{
			code:    CodeNotFound,
			err:     err,
			message: msg + ": " + err.Error(),
		}
	default:
		return AppError{
			code:    CodeError,
			err:     err,
			message: msg + ": " + err.Error(),
		}
	}
}

func (e AppError) Code() Code {
	return e.code
}

func (e AppError) Message() string {
	if e.message != "" {
		return e.message
	}
	return e.err.Error()
}
