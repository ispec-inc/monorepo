package entity

import (
	"time"

	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/article"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
)

const (
	ArticleModelName = "Article"
	ArticleTableName = "articles"
)

type Article struct {
	ID        string    `gorm:"primary_key;column:id;type:varchar;size:255;"`
	UserID    string    `gorm:"column:user_id;type:string;"`
	Title     string    `gorm:"column:title;type:varchar;size:255;"`
	Content   string    `gorm:"column:content;type:varchar;size:255;"`
	CreatedAt time.Time `gorm:"column:created_at;type:datetime;"`
	UpdatedAt time.Time `gorm:"column:updated_at;type:datetime;"`
}

func (a Article) ToModel() article.Article {
	return article.Article{
		ID:      article.ID(a.ID),
		UserID:  user.ID(a.UserID),
		Title:   article.Title(a.Title),
		Content: article.Content(a.Content),
	}
}
