package repository

import (
	"github.com/ispec-inc/monorepo/go/svc/article/pkg/domain/model"
)

type User interface {
	Get(id uint) (*model.User, error)
	List(ids []uint) ([]*model.User, error)
	Create(user *model.User) error
}
