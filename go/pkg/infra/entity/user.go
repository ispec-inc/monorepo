package entity

import (
	"errors"
	"time"

	"github.com/ispec-inc/monorepo/go/pkg/apperror"
	"gorm.io/gorm"
)

const (
	UserModelName = "User"
	UserTableName = "users"
)

type User struct {
	ID          int64     `gorm:"column:id"`
	Name        string    `gorm:"column:name"`
	Description string    `gorm:"column:description"`
	Email       string    `gorm:"column:email"`
	CreatedAt   time.Time `gorm:"column:created_at"`
	UpdatedAt   time.Time `gorm:"column:updated_at"`

	Articles []Article `gorm:"foreignKey:UserID;references:ID"`
}

func (e *User) BeforeCreate(tx *gorm.DB) error {
	err := tx.Where("email = ?", e.Email).First(&User{}).Error
	if err == nil {
		return apperror.ErrDuplicated
	}
	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}
	return nil
}
