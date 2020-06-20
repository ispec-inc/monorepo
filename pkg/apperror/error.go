package apperror

type Code string

var CodeError Code = "error"
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

func (e appError) Code() Code {
	return e.code
}

func (e appError) Message() string {
	if e.message != "" {
		return e.message
	}
	return e.err.Error()
}
