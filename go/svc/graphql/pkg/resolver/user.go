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

func NewUser(ctx context.Context, args UserResolverArgs) *User {
	user, err := loader.LoadUser(ctx, args.ID)
	if err != nil || user == nil {
		return nil
	}
	return &User{user: *user}
}

func (u User) ID() graphql.ID {
	return graphql.ID(fmt.Sprintf("%d", u.user.ID))
}

func (u User) Name() string {
	return u.user.Name
}