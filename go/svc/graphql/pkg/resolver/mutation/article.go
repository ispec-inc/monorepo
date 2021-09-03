package mutation

import (
	"context"

	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver"
)

func CreateArticle(ctx context.Context, title, body string) (*resolver.Article, error) {
	a := model.NewArticle(1, title, body)
	if err := a.Create(); err != nil {
		return nil, err
	}

	return resolver.NewArticle(ctx, *a), nil
}
