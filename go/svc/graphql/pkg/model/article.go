package model

import (
	"errors"

	"github.com/ispec-inc/monorepo/go/pkg/apperror"
	"github.com/ispec-inc/monorepo/go/pkg/infra/entity"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/database"
	"go.uber.org/multierr"
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

func (a *Article) validate() error {
	var err error
	if a.UserID == 0 {
		err = multierr.Append(err, errors.New("article must have user"))
	}
	if a.Title == "" {
		err = multierr.Append(err, errors.New("article must have title"))
	}
	if a.Body == "" {
		err = multierr.Append(err, errors.New("article must have body"))
	}
	if err != nil {
		return apperror.WithCode(apperror.CodeInvalid, err)
	}
	return nil
}

func (a *Article) Find(id int64) error {
	return apperror.NewGormFind(
		database.Get().First(a, id).Error,
		entity.ArticleTableName,
	)
}

func (a *Article) Create() error {
	if err := a.validate(); err != nil {
		return err
	}
	return apperror.NewGormCreate(
		database.Get().Create(a).Error,
		entity.ArticleTableName,
	)
}

func (a *Article) Save() error {
	if err := a.validate(); err != nil {
		return err
	}
	return apperror.NewGormSave(
		database.Get().Save(a).Error,
		entity.ArticleTableName,
	)
}

func (a *Article) Delete() error {
	return apperror.NewGormDelete(
		database.Get().Delete(a).Error,
		entity.ArticleTableName,
	)
}

func (as *Articles) Find() error {
	return apperror.NewGormFind(
		database.Get().Find(as).Error,
		entity.ArticleTableName,
	)
}

func (as *Articles) List(ids []int64) error {
	q := database.Get()
	if len(ids) > 0 {
		q = q.Where("id in ?", ids)
	}

	return apperror.NewGormFind(
		q.Find(as).Error,
		entity.ArticleTableName,
	)
}

func (as *Articles) ListByUserID(id int64) error {
	return apperror.NewGormFind(
		database.Get().Where("user_id = ?", id).Find(as).Error,
		entity.ArticleTableName,
	)
}

func (as *Articles) ListByUserIDs(ids []int64) error {
	return apperror.NewGormFind(
		database.Get().Where("user_id in ?", ids).Find(as).Error,
		entity.ArticleTableName,
	)
}

func (as *Articles) ToMapByUserID() map[int64]*Articles {
	data := make(map[int64]*Articles)
	for _, a := range *as {
		if data[a.UserID] == nil {
			data[a.UserID] = &Articles{}
		}
		*data[a.UserID] = append(*data[a.UserID], a)
	}

	return data
}
