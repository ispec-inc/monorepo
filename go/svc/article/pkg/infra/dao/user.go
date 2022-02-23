package dao

import (
	"github.com/ispec-inc/monorepo/go/pkg/apperror"
	"github.com/ispec-inc/monorepo/go/pkg/infra/entity"
	"github.com/ispec-inc/monorepo/go/svc/article/pkg/domain/model"
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

func (d User) Get(id uint) (*model.User, error) {
	e := &entity.User{}
	if err := d.db.First(e, id).Error; err != nil {
		return nil, apperror.NewGormFind(err, entity.UserModelName)
	}
	return model.NewUserFromEntity(e), nil
}

func (d User) List(ids []uint) ([]*model.User, error) {
	query := d.db
	if len(ids) > 0 {
		query = query.Where("id in (?)", ids)
	}

	var es []entity.User
	if err := query.Find(&es).Error; err != nil {
		return nil, apperror.NewGormFind(err, entity.UserModelName)
	}

	ms := make([]*model.User, len(es))
	for i, e := range es {
		ms[i] = model.NewUserFromEntity(&e)
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
		return apperror.NewGormCreate(err, entity.UserModelName)
	}
	return nil
}
