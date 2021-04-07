package entity

import (
	"time"

	"github.com/ispec-inc/monorepo/server/pkg/domain/model"
)

const UserModelName = "User"

type User struct {
	ID        int64     `gorm:"column:id"`
	UserID    int64     `gorm:"column:user_id"`
	Code      string    `gorm:"column:code"`
	CreatedAt time.Time `gorm:"column:created_at"`
	UpdatedAt time.Time `gorm:"column:updated_at"`
}

func NewUserFromModel(
	m model.User,
) User {
	return User{
		ID:     m.ID,
		UserID: m.UserID,
		Code:   m.Code,
	}
}

func (i User) ToModel() model.User {
	return model.User{
		ID:     i.ID,
		UserID: i.UserID,
		Code:   i.Code,
	}
}
