package apperror

import (
	"errors"
	"testing"

	"github.com/stretchr/testify/assert"
)

func NewTestError(c Code) Error {
	if c == CodeNoError {
		return nil
	}
	return New(c, errors.New(""))
}

func AssertError(t *testing.T, c Code, aerr Error) {
	if c == CodeNoError {
		assert.Equal(t, nil, aerr)
	} else {
		assert.Equal(t, c, aerr.Code())
	}
}
