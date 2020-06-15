package entity

import (
	"time"
)

type Invitation struct {
	ID        int64      `gorm:"column:id; type:bigint(20) auto_increment; not null; primary_key"`
	UserID    int64      `gorm:"column:user_id"`
	Code      string     `gorm:"column:code"`
	CreatedAt *time.Time `gorm:"created_at; not null"`
	UpdatedAt *time.Time `gorm:"updated_at; not null"`
}
