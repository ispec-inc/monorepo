package repository

import (
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
)

type Invitation interface {
	FindByUserID(int) model.Invitation
}
