//lint:file-ignore U1000 Ignore all unused code

package dao

import (
	"errors"
	"fmt"

	"github.com/ispec-inc/monorepo/server/pkg/apperror"
	"gorm.io/gorm"
)

type gormErr struct {
	s string
}

func newGormErr(method, model string, err error) error {
	var code apperror.Code
	switch err {
	case gorm.ErrRecordNotFound:
		code = apperror.CodeNotFound
	case apperror.ErrDuplicated:
		code = apperror.CodeInvalid
	default:
		code = apperror.CodeError
	}
	fmt.Println("err:", err)
	fmt.Println("duplidated:", apperror.ErrDuplicated)
	fmt.Println("erros.Is", errors.Is(err, apperror.ErrDuplicated))

	return apperror.WithCode(
		code,
		&gormErr{fmt.Sprintf("%s record `%s` error: %s", method, model, err.Error())},
	)
}

func (e *gormErr) Error() string {
	return e.s
}

func newGormFindError(err error, model string) error {
	return newGormErr("Find", model, err)
}

func newGormCreateError(err error, model string) error {
	return newGormErr("Create", model, err)
}

func newGormUpdateError(err error, model string) error {
	return newGormErr("Update", model, err)
}

func newGormDeleteError(err error, model string) error {
	return newGormErr("Delete", model, err)
}
