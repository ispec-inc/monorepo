package entity

import (
	"time"
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
}
