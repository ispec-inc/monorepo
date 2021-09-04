package entity

import (
	"time"
)

const (
	HeroModelName = "Hero"
	HeroTableName = "heroes"
)

type Hero struct {
	ID        int64     `gorm:"column:id"`
	Name      string    `gorm:"column:name"`
	Age       int       `gorm:"column:age"`
	IsJedi    bool      `gorm:"column:is_jedi"`
	CreatedAt time.Time `gorm:"column:created_at"`
	UpdatedAt time.Time `gorm:"column:updated_at"`
}

func (Hero) TableName() string {
	return HeroTableName
}
