package resolver

import (
	"context"
	"strconv"

	"github.com/davecgh/go-spew/spew"
	graphql "github.com/graph-gophers/graphql-go"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/loader"
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

func (q Query) User(
	ctx context.Context,
	args QueryUserArgs,
) (*User, error) {

	id, err := strconv.Atoi(string(args.ID))
	if err != nil {
		return nil, err
	}

	u := &model.User{}
	if err := u.Find(int64(id)); err != nil {
		return nil, err
	}

	return NewUser(*u), nil
}

type QueryArticleArgs struct {
}

func (q Query) Articles(
	ctx context.Context,
) (*[]*Article, error) {

	ars, err := loader.LoadArticles(ctx)
	if err != nil {
		return nil, err
	}
	spew.Dump(ars)

	as := make([]*Article, len(ars))
	for i := range ars {
		as[i] = NewArticle(ars[i].Article)
	}

	return &as, nil
}
