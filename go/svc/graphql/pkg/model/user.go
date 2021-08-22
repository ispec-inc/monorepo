package model

import (
	"errors"

	"github.com/ispec-inc/monorepo/go/pkg/apperror"
	"github.com/ispec-inc/monorepo/go/pkg/infra/entity"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/database"
	"go.uber.org/multierr"
)

type (
	User struct {
		entity.User
	}
	Users []User
)

func NewUser(name, description string) *User {
	atl := &User{}
	atl.Name = name
	atl.Description = description
	return atl
}

func (a *User) validate() error {
	var err error
	if a.Name == "" {
		err = multierr.Append(err, errors.New("user must have name"))
	}
	if a.Description == "" {
		err = multierr.Append(err, errors.New("user must have description"))
	}
	if err != nil {
		return apperror.WithCode(apperror.CodeInvalid, err)
	}
	return nil
}

func (a *User) Find(id int64) error {
	return apperror.NewGormFind(
		database.Get().First(a, id).Error,
		entity.UserTableName,
	)
}

func (a *User) Create() error {
	if err := a.validate(); err != nil {
		return err
	}
	return apperror.NewGormCreate(
		database.Get().Create(a).Error,
		entity.UserTableName,
	)
}

func (a *User) Save() error {
	if err := a.validate(); err != nil {
		return err
	}
	return apperror.NewGormSave(
		database.Get().Save(a).Error,
		entity.UserTableName,
	)
}

func (a *User) Delete() error {
	return apperror.NewGormDelete(
		database.Get().Delete(a).Error,
		entity.UserTableName,
	)
}

func (a *Users) Find() error {
	return apperror.NewGormFind(
		database.Get().Find(a).Error,
		entity.UserTableName,
	)
}

func (u *Users) List(ids []int64) error {
	q := database.Get()
	if len(ids) > 0 {
		q = q.Where("id in ?", ids)
	}

	return apperror.NewGormFind(
		q.Find(u).Error,
		entity.ArticleTableName,
	)
}
