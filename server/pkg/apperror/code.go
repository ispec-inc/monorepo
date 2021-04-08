package apperror

const (
	CodeInvalid      = Code("invalid")
	CodeUnauthorized = Code("unauthorized")
	CodeNotFound     = Code("not found")
	CodeError        = Code("error")
)

type Code string

func (c Code) String() string {
	return string(c)
}
