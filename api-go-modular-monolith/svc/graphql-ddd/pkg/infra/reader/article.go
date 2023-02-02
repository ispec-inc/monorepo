package reader

import (
	"github.com/ispec-inc/monorepo/go/pkg/apperror"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/article"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/query"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/entity"
	"gorm.io/gorm"
)

type Article struct {
	db *gorm.DB
}

func NewArticle(db *gorm.DB) query.Article {
	return Article{db: db}
}

func (a Article) Get(id article.ID) (article.Article, error) {
	e := entity.Article{}
	if err := a.defaultScope().First(&e, id).Error; err != nil {
		return article.Article{}, apperror.NewGormFind(err, entity.ArticleModelName)
	}

	m := e.ToModel()
	return m, nil
}

func (a Article) List(ids []article.ID) ([]article.Article, error) {
	es := []entity.Article{}
	if err := a.defaultScope().Where("id in ?", ids).Find(&es).Error; err != nil {
		return []article.Article{}, apperror.NewGormFind(err, entity.ArticleModelName)
	}

	as := make([]article.Article, len(es))
	for i := range es {
		e := es[i]
		as[i] = e.ToModel()
	}

	return as, nil
}

func (a Article) defaultScope() *gorm.DB {
	return a.db
}
