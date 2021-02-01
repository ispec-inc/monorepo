package apperror

type Error interface {
	Code() Code
	Error() string
}

type appError struct {
	error
	code    Code
	message string
}

func New(code Code, err error) Error {
	return appError{
		error:   err,
		code:    code,
		message: err.Error(),
	}
}

func (e appError) Code() Code {
	return e.code
}

func (e appError) Error() string {
	if e.message != "" {
		return e.message
	}
	return e.error.Error()
}
