package resolver

import (
	"context"
	"strconv"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
)

type Query struct {
}

func NewQuery() *Query {
	return &Query{}
}

type QueryUserArgs struct {
	ID graphql.ID
}

func (q Query) CurrentUser(
	ctx context.Context,
) (*User, error) {

	return NewUser(ctx, UserResolverArgs{ID: int64(1)}), nil
}

func (q Query) User(
	ctx context.Context,
	args QueryUserArgs,
) (*User, error) {

	id, err := strconv.Atoi(string(args.ID))
	if err != nil {
		return nil, err
	}
	return NewUser(ctx, UserResolverArgs{ID: int64(id)}), nil
}

type QueryArticleArgs struct {
	UserID *graphql.ID
}

func (q Query) Articles(
	ctx context.Context,
	args QueryArticleArgs,
) (*[]*Article, error) {

	ms := model.Articles{}
	if err := ms.Find(); err != nil {
		return nil, err
	}

	as := make([]*Article, len(ms))
	for i := range ms {
		as[i] = NewArticle(ctx, ms[i])
	}

	return &as, nil
}

type MutationArticleArgs struct {
	Title string
	Body  string
}

func (q Query) CreateArticle(
	ctx context.Context,
	args MutationArticleArgs,
) (*Article, error) {
	a := model.NewArticle(1, args.Title, args.Body)
	if err := a.Create(); err != nil {
		return nil, err
	}

	return NewArticle(ctx, *a), nil
}
