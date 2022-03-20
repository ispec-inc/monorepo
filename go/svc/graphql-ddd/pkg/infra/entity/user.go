package entity

import (
	"time"

	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
)

const (
	UserModelName = "User"
	UserTableName = "users"
)

type User struct {
	ID        string    `gorm:"primary_key;column:id;type:varchar;size:255;"`
	Name      string    `gorm:"column:name;type:varchar;size:255;"`
	Email     string    `gorm:"column:email;type:varchar;size:255;"`
	CreatedAt time.Time `gorm:"column:created_at;type:datetime;"`
	UpdatedAt time.Time `gorm:"column:updated_at;type:datetime;"`
}

func (u User) ToModel() user.User {
	return user.User{
		ID:    user.ID(u.ID),
		Name:  user.Name(u.Name),
		Email: user.Email(u.Email),
	}
}
