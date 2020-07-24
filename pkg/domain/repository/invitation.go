//go:generate go run github.com/golang/mock/mockgen --build_flags=--mod=vendor -package mock -source=invitation.go -destination=../mock/invitation.go

package repository

import (
	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
)

type Invitation interface {
	Find(int64) (model.Invitation, apperror.Error)
	Create(model.Invitation) (model.Invitation, apperror.Error)
}
