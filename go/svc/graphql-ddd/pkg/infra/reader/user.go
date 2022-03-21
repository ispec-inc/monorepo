package reader

import (
	"github.com/ispec-inc/monorepo/go/pkg/apperror"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/query"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/entity"
	"gorm.io/gorm"
)

type User struct {
	db *gorm.DB
}

func NewUser(db *gorm.DB) query.User {
	return User{db: db}
}

func (a User) Get(id user.ID) (user.User, error) {
	e := entity.User{}
	if err := a.defaultScope().First(&e, id).Error; err != nil {
		return user.User{}, apperror.NewGormFind(err, entity.UserModelName)
	}

	m := e.ToModel()
	return m, nil
}

func (a User) List(ids []user.ID) ([]user.User, error) {
	es := []entity.User{}
	if err := a.defaultScope().Where("id in ?", ids).Find(&es).Error; err != nil {
		return []user.User{}, apperror.NewGormFind(err, entity.UserModelName)
	}

	as := make([]user.User, len(es))
	for i := range es {
		e := es[i]
		as[i] = e.ToModel()
	}

	return as, nil
}

func (a User) defaultScope() *gorm.DB {
	return a.db
}
