package entity

import (
	"errors"
	"time"

	"github.com/ispec-inc/monorepo/server/pkg/apperror"
	"github.com/ispec-inc/monorepo/server/pkg/domain/model"
	"gorm.io/gorm"
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

func (u *User) BeforeCreate(tx *gorm.DB) error {
	err := tx.Where("email = ?", u.Email).First(&User{}).Error
	if err == nil {
		return apperror.ErrDuplicated
	}
	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}
	return nil
}
