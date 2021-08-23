package handler

import (
	"context"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver/mutation"
)

type QueryArticleArgs struct {
	UserID *graphql.ID
}

func (q Handler) Articles(
	ctx context.Context,
	args QueryArticleArgs,
) (*[]*resolver.Article, error) {

	ms := model.Articles{}
	if err := ms.Find(); err != nil {
		return nil, err
	}

	as := make([]*resolver.Article, len(ms))
	for i := range ms {
		as[i] = resolver.NewArticle(ctx, ms[i])
	}

	return &as, nil
}

type MutationArticleArgs struct {
	Title string
	Body  string
}

func (q Handler) CreateArticle(
	ctx context.Context,
	args MutationArticleArgs,
) (*resolver.Article, error) {
	return mutation.CreateArticle(ctx, args.Title, args.Body)
}
