package query

import "github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/article"

type Article interface {
	Get(article.ID) (article.Article, error)
	List([]article.ID) ([]article.Article, error)
}
