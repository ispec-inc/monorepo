package handler

import (
	"context"

	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/adapter/article"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/resolver"
)

func (h Handler) PostArticle(ctx context.Context, args article.PostArticleArgs) (*resolver.Article, error) {
	adapter := article.New(h.registry)
	return adapter.PostArticle(ctx, args)
}
