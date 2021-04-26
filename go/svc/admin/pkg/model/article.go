package model

import (
	"github.com/ispec-inc/monorepo/go/pkg/apperror"
	"github.com/ispec-inc/monorepo/go/pkg/infra/entity"
	"github.com/ispec-inc/monorepo/go/svc/admin/pkg/database"
)

type (
	Article struct {
		entity.Article
	}
	Articles []Article
)

func NewArticle(userID int64, title, body string) *Article {
	atl := &Article{}
	atl.UserID = userID
	atl.Title = title
	atl.Body = body
	return atl
}

func (u *Article) Find(id int64) error {
	return apperror.NewGormFind(
		database.Get().First(u, id).Error,
		entity.ArticleTableName,
	)
}

func (u *Article) Create() error {
	return apperror.NewGormCreate(
		database.Get().Create(u).Error,
		entity.ArticleTableName,
	)
}

func (u *Article) Save() error {
	return apperror.NewGormSave(
		database.Get().Save(u).Error,
		entity.ArticleTableName,
	)
}

func (u *Article) Delete() error {
	return apperror.NewGormDelete(
		database.Get().Delete(u).Error,
		entity.ArticleTableName,
	)
}

func (u *Articles) Find() error {
	return apperror.NewGormFind(
		database.Get().Find(u).Error,
		entity.ArticleTableName,
	)
}
