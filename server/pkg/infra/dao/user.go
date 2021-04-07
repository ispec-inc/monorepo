package dao

import (
	"gorm.io/gorm"

	"github.com/ispec-inc/monorepo/server/pkg/domain/model"
	"github.com/ispec-inc/monorepo/server/pkg/infra/entity"
)

type User struct {
	db *gorm.DB
}

func NewUser(db *gorm.DB) User {
	return User{db}
}

func (i User) Find(id int64) (model.User, error) {
	var inv entity.User
	if err := i.db.First(&inv, id).Error; err != nil {
		return model.User{}, newGormFindError(err, entity.UserModelName)
	}
	return inv.ToModel(), nil
}

func (i User) FindByUserID(uid int64) (model.User, error) {
	var inv entity.User
	if err := i.db.First(&inv, "user_id = ?", uid).Error; err != nil {
		return model.User{}, newGormFindError(err, entity.UserModelName)
	}
	return inv.ToModel(), nil
}

func (i User) Create(minv model.User) error {
	e := entity.NewUserFromModel(minv)
	if err := i.db.Create(&e).Error; err != nil {
		return newGormCreateError(err, entity.UserModelName)
	}
	return nil
}
