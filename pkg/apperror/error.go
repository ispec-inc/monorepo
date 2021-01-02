package apperror

type Code string

const (
	CodeNoError  Code = "no error"
	CodeError    Code = "error"
	CodeInvalid  Code = "invalid"
	CodeSuccess  Code = "sucess"
	CodeNotFound Code = "not found"
)

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

func (e AppError) Code() Code {
	return e.code
}

func (e AppError) Message() string {
	if e.message != "" {
		return e.message
	}
	return e.err.Error()
}
