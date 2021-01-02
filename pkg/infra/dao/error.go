package dao

import (
	"fmt"

	"github.com/jinzhu/gorm"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
)

func NewGormError(err error, msg string) apperror.Error {
	switch err {
	case gorm.ErrRecordNotFound:
		return apperror.New(apperror.CodeNotFound, fmt.Errorf("%s: %s", msg, err.Error()))
	default:
		return apperror.New(apperror.CodeError, fmt.Errorf("%s: %s", msg, err.Error()))
	}
}
