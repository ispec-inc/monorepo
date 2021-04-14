package dao

import (
	"github.com/ispec-inc/monorepo/server/pkg/domain/model"
	"github.com/ispec-inc/monorepo/server/pkg/infra/entity"
	"gorm.io/gorm"
)

type User struct {
	db *gorm.DB
}

func NewUser(db *gorm.DB) User {
	return User{
		db,
	}
}

func (d User) Get(id int64) (*model.User, error) {
	var e entity.User
	if err := d.db.First(&e, id).Error; err != nil {
		return nil, newGormFindError(err, entity.UserModelName)
	}
	return e.ToModel(), nil
}

func (d User) List(ids []int64) ([]*model.User, error) {
	query := d.db
	if len(ids) > 0 {
		query = query.Where("id in (?)", ids)
	}

	var es []entity.User
	if err := query.Find(&es).Error; err != nil {
		return nil, newGormFindError(err, entity.UserModelName)
	}

	ms := make([]*model.User, len(es))
	for i, e := range es {
		ms[i] = e.ToModel()
	}
	return ms, nil
}

func (d User) Create(m *model.User) error {
	e := &entity.User{
		Name:        m.Name,
		Description: m.Description,
		Email:       m.Email,
	}
	if err := d.db.Create(e).Error; err != nil {
		return newGormCreateError(err, entity.UserModelName)
	}
	return nil
}
