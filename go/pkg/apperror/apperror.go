package apperror

import (
	"github.com/pkg/errors"
)

type Error struct {
	code Code
	err  error
}

func New(code Code, err error) error {
	return errors.WithStack(&Error{
		code: code,
		err:  err,
	})
}

func Errorf(code Code, msg string, args ...error) error {
	return errors.WithStack(&Error{
		code: code,
		err:  errors.Errorf(msg, args),
	})
}

func Wrap(err error, msg string) error {
	return errors.Wrap(err, msg)
}

func Wrapf(err error, msg string, args ...interface{}) error {
	return errors.Wrapf(err, msg, args...)
}

func (e *Error) Code() Code {
	return e.code
}

func (e *Error) Error() string {
	return e.err.Error()
}

func Unwrap(err error) *Error {
	if err == nil {
		return nil
	}

	aerr, ok := errors.Cause(err).(*Error)
	if ok {
		aerr.err = err
		return aerr
	}
	return nil
}
