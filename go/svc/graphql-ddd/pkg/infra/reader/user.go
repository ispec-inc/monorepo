package reader

import (
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/entity"
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

func (u User) Get(id user.ID) (*user.User, error) {
	e := entity.User{}

	db := u.defaultScope()
	if err := db.First(&e, id).Error; err != nil {
		return nil, err
	}
	return e.ToModel(), nil
}

func (u User) List(ids []user.ID) (*user.UserList, error) {
	us := []entity.User{}

	db := u.defaultScope()
	if len(ids) > 0 {
		db = db.Where("id in ?", ids)
	}

	if err := db.Find(&us).Error; err != nil {
		return nil, err
	}

	ms := make(user.UserList, len(us))
	for i := range us {
		ms[i] = *us[i].ToModel()
	}

	return &ms, nil
}

func (u User) defaultScope() *gorm.DB {
	return u.db.Preload("UserDetail")
}
