package handler

import (
	"context"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver/mutation"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/resolver/query"
)

type QueryArticleArgs struct {
	UserID *graphql.ID
}

func (h Handler) Articles(ctx context.Context, args QueryArticleArgs) (*[]*resolver.Article, error) {
	return query.Articles(ctx)
}

type MutationArticleArgs struct {
	Title string
	Body  string
}

func (h Handler) CreateArticle(ctx context.Context, args MutationArticleArgs) (*resolver.Article, error) {
	return mutation.CreateArticle(ctx, args.Title, args.Body)
}
