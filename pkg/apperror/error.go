package apperror

type Error interface {
	Status() int
	Message() string
}

type appError struct {
	statusCode int
	code       string
	err        error
	message    string
}

func New(status int, err error) appError {
	return appError{
		statusCode: status,
		code:       "000",
		err:        err,
		message:    err.Error(),
	}
}

func (e appError) Status() int {
	return e.statusCode
}

func (e appError) Message() string {
	if e.message != "" {
		return e.message
	}
	return e.err.Error()
}
