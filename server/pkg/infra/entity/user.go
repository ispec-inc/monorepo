package entity

import (
	"time"

	"github.com/ispec-inc/monorepo/server/pkg/domain/model"
)

const UserModelName = "User"

type User struct {
	ID          int64     `gorm:"column:id"`
	Name        string    `gorm:"column:name"`
	Description string    `gorm:"column:description"`
	Email       string    `gorm:"column:email"`
	CreatedAt   time.Time `gorm:"column:created_at"`
	UpdatedAt   time.Time `gorm:"column:updated_at"`
}

func (e *User) ToModel() *model.User {
	return &model.User{
		CreatedAt:   e.CreatedAt,
		Description: e.Description,
		Email:       e.Email,
		ID:          e.ID,
		Name:        e.Name,
		UpdatedAt:   e.UpdatedAt,
	}
}
