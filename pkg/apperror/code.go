package apperror

const (
	CodeNoError  Code = "no error"
	CodeError    Code = "error"
	CodeInvalid  Code = "invalid"
	CodeSuccess  Code = "sucess"
	CodeNotFound Code = "not found"
)

type Code string

func (c Code) String() string {
	return string(c)
}
