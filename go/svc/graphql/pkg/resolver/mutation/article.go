package mutation

import (
	"context"

	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver"
)

type ArticleInput struct {
	Title string
	Body  string
}

func CreateArticle(ctx context.Context, input ArticleInput) (*resolver.Article, error) {
	a := model.NewArticle(1, input.Title, input.Body)
	if err := a.Create(); err != nil {
		return nil, err
	}

	return resolver.NewArticle(ctx, *a), nil
}
