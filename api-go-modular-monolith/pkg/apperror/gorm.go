//lint:file-ignore U1000 Ignore all unused code

package apperror

import (
	"fmt"

	"gorm.io/gorm"
)

type gormErr struct {
	s string
}

func newGorm(method, model string, err error) error {
	if err == nil {
		return nil
	}

	var code Code
	switch err {
	case gorm.ErrRecordNotFound:
		code = CodeNotFound
	case ErrDuplicated:
		code = CodeInvalid
	default:
		code = CodeError
	}

	return WithCode(
		code,
		&gormErr{fmt.Sprintf("%s record `%s` error: %s", method, model, err.Error())},
	)
}

func (e *gormErr) Error() string {
	return e.s
}

func NewGormFind(err error, model string) error {
	return newGorm("Find", model, err)
}

func NewGormCreate(err error, model string) error {
	return newGorm("Create", model, err)
}

func NewGormSave(err error, model string) error {
	return newGorm("Save", model, err)
}

func NewGormUpdate(err error, model string) error {
	return newGorm("Update", model, err)
}

func NewGormDelete(err error, model string) error {
	return newGorm("Delete", model, err)
}
