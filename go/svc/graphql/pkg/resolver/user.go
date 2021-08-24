package resolver

import (
	"context"
	"fmt"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/loader"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
)

type User struct {
	user model.User
}

type UserResolverArgs struct {
	ID int64
}

func NewUser(ctx context.Context, args UserResolverArgs) (*User, error) {
	user, err := loader.LoadUser(ctx, args.ID)
	if err != nil {
		return nil, err
	}
	return &User{user: *user}, nil
}

func (u User) ID() graphql.ID {
	return graphql.ID(fmt.Sprintf("%d", u.user.ID))
}

func (u User) Name() string {
	return u.user.Name
}

func (u User) Articles(ctx context.Context) ([]*Article, error) {
	as, err := loader.LoadArticlesByUserID(ctx, u.user.ID)
	if err != nil {
		return nil, err
	}

	rs := make([]*Article, len(*as))
	for i := range *as {
		rs[i] = NewArticle(ctx, (*as)[i])
	}
	return rs, nil
}
