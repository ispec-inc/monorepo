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
	ID         int64      `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	UserDetail UserDetail `gorm:"foreignKey:UserID;references:ID"`
	CreatedAt  time.Time  `gorm:"column:created_at;type:datetime;"`
	UpdatedAt  time.Time  `gorm:"column:updated_at;type:datetime;"`
}

func (u User) ToModel() *user.User {
	return &user.User{
		ID:        user.ID(u.ID),
		Name:      u.UserDetail.Name,
		Icon:      user.Icon(u.UserDetail.IconURL),
		Privilege: user.FindPrivilege(u.UserDetail.Privilege),
	}
}
