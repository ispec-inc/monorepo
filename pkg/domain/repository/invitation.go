//go:generate go run github.com/golang/mock/mockgen -source=invitation.go -destination=mock/invitation.go
//go:generate go run github.com/ispec-inc/civgen-go/mockio -source=invitation.go -destination=mockio/invitation.go

package repository

import (
	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
)

type Invitation interface {
	Find(id int64) (model.Invitation, apperror.Error)
	FindByUserID(uid int64) (model.Invitation, apperror.Error)
	Create(minv model.Invitation) apperror.Error
}
