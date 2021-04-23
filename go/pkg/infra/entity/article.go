package entity

import (
	"time"
)

const (
	ArticleModelName = "Article"
	ArticleTableName = "articles"
)

type Article struct {
	ID        int64     `gorm:"column:id"`
	UserID    int64     `gorm:"column:user_id"`
	Title     string    `gorm:"column:title"`
	Body      string    `gorm:"column:body"`
	CreatedAt time.Time `gorm:"column:created_at"`
	UpdatedAt time.Time `gorm:"column:updated_at"`
}
