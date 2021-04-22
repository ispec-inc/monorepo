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
	Articles []*Article
)

func NewArticle(userID int64, title, body string) *Article {
	atl := &Article{}
	atl.UserID = userID
	atl.Title = title
	atl.Body = body
	return atl
}

func (u *Article) Find(id int64) error {
	if err := database.Get().Find(u).Error; err != nil {
		return apperror.NewGormFind(err, entity.ArticleTableName)
	}
	return nil
}

func (u *Article) Create() error {
	if err := database.Get().Create(u).Error; err != nil {
		return apperror.NewGormCreate(err, entity.ArticleTableName)
	}
	return nil
}

func (u *Article) Update() error {
	if err := database.Get().Save(u).Error; err != nil {
		return apperror.NewGormUpdate(err, entity.ArticleTableName)
	}
	return nil
}

func (u *Article) Delete() error {
	if err := database.Get().Delete(u).Error; err != nil {
		return apperror.NewGormDelete(err, entity.ArticleTableName)
	}
	return nil
}

func (u Articles) Find() error {
	if err := database.Get().Find(u).Error; err != nil {
		return apperror.NewGormFind(err, entity.ArticleTableName)
	}
	return nil
}
