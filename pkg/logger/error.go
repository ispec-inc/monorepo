package logger

type Error struct {
	Code      string
	Message   string
	ErrorType string
	Error     error
}
