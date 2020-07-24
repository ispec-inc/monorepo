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

type appError struct {
	code    Code
	err     error
	message string
}

func New(code Code, err error) appError {
	return appError{
		code:    code,
		err:     err,
		message: err.Error(),
	}
}

func NewGorm(err error, msg string) appError {
	switch err {
	case gorm.ErrRecordNotFound:
		return appError{
			code:    CodeNotFound,
			err:     err,
			message: msg + ": " + err.Error(),
		}
	default:
		return appError{
			code:    CodeError,
			err:     err,
			message: msg + ": " + err.Error(),
		}
	}
}

func (e appError) Code() Code {
	return e.code
}

func (e appError) Message() string {
	if e.message != "" {
		return e.message
	}
	return e.err.Error()
}
