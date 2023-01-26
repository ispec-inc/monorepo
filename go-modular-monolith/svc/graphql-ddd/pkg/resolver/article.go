package resolver

import (
	"context"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/article"
)

type Article struct {
	article article.Article
}

func NewArticle(ctx context.Context, article article.Article) *Article {
	return &Article{article: article}
}

func (a Article) ID() graphql.ID {
	return graphql.ID(a.article.ID)
}

func (a Article) Title() string {
	return string(a.article.Title)
}

func (a Article) Content() string {
	return string(a.article.Content)
}
