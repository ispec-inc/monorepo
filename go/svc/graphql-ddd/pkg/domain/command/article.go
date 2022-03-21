package command

import "github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/article"

type Article interface {
	Create(article.Article) error
}
