package repository

import (
	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
)

type Invitation interface {
	Find(int64) (model.Invitation, apperror.Error)
}
