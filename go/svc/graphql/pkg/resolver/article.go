package resolver

import (
	"context"
	"fmt"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
)

type Article struct {
	ctx     context.Context
	article model.Article
}

func NewArticle(ctx context.Context, article model.Article) *Article {
	return &Article{ctx: ctx, article: article}
}

func (a Article) ID() graphql.ID {
	return graphql.ID(fmt.Sprintf("%d", a.article.ID))
}

func (a Article) Title() string {
	return a.article.Title
}

func (a Article) Body() string {
	return a.article.Body
}

func (a Article) Writer(ctx context.Context) (*User, error) {
	return NewUser(a.ctx, UserResolverArgs{ID: a.article.UserID}), nil
}
