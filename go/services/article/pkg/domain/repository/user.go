package repository

import (
	"github.com/ispec-inc/monorepo/go/services/article/pkg/domain/model"
)

type User interface {
	Get(id int64) (*model.User, error)
	List(ids []int64) ([]*model.User, error)
	Create(user *model.User) error
}
