package dao

import (
	"fmt"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"github.com/pkg/errors"
	"gorm.io/gorm"
)

type gormErr struct {
	s string
}

func newGormErr(method, model string, err error) *gormErr {
	return &gormErr{fmt.Sprintf("%s record `%s` error: %s", method, model, err.Error())}
}

func (e *gormErr) Error() string {
	return e.s
}

func newGormFindError(err error, model string) error {
	var code apperror.Code
	switch {
	case errors.Is(err, gorm.ErrRecordNotFound):
		code = apperror.CodeNotFound
	default:
		code = apperror.CodeError
	}

	return apperror.WithCode(code, newGormErr("Find", model, err))
}

func newGormCreateError(err error, model string) error {
	return apperror.WithCode(apperror.CodeError, newGormErr("Create", model, err))
}

func newGormUpdateError(err error, model string) error {
	return apperror.WithCode(apperror.CodeError, newGormErr("Update", model, err))
}

func newGormDeleteError(err error, model string) error {
	return apperror.WithCode(apperror.CodeError, newGormErr("Delete", model, err))
}
