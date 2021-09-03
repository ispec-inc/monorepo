package query

import (
	"context"

	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver"
)

func Articles(ctx context.Context) (*[]*resolver.Article, error) {
	as := model.Articles{}
	err := as.List(nil)
	if err != nil {
		return nil, err
	}
	rs := make([]*resolver.Article, len(as))
	for i := range as {
		rs[i] = resolver.NewArticle(ctx, as[i])
	}
	return &rs, nil
}
