package apperror

import "errors"

var (
	ErrDuplicated = errors.New("duplicated key exists")
)
