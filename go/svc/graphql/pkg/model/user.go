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

func (u *User) validate() error {
	var err error
	if u.Name == "" {
		err = multierr.Append(err, errors.New("user must have name"))
	}
	if u.Description == "" {
		err = multierr.Append(err, errors.New("user must have description"))
	}
	if err != nil {
		return apperror.WithCode(apperror.CodeInvalid, err)
	}
	return nil
}

func (u *User) Find(id int64) error {
	return apperror.NewGormFind(
		database.Get().First(u, id).Error,
		entity.UserTableName,
	)
}

func (u *User) Create() error {
	if err := u.validate(); err != nil {
		return err
	}
	return apperror.NewGormCreate(
		database.Get().Create(u).Error,
		entity.UserTableName,
	)
}

func (u *User) Save() error {
	if err := u.validate(); err != nil {
		return err
	}
	return apperror.NewGormSave(
		database.Get().Save(u).Error,
		entity.UserTableName,
	)
}

func (u *User) Delete() error {
	return apperror.NewGormDelete(
		database.Get().Delete(u).Error,
		entity.UserTableName,
	)
}

func (u *Users) Find() error {
	return apperror.NewGormFind(
		database.Get().Find(u).Error,
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
