package entity

import (
	"time"
)

const (
	ArticleModelName = "Article"
	ArticleTableName = "articles"
)

type Article struct {
	ID        uint      `gorm:"column:id"`
	UserID    uint      `gorm:"column:user_id"`
	Title     string    `gorm:"column:title"`
	Body      string    `gorm:"column:body"`
	CreatedAt time.Time `gorm:"column:created_at"`
	UpdatedAt time.Time `gorm:"column:updated_at"`
}
