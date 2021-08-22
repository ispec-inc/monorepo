package resolver

import (
	"fmt"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
)

type User struct {
	user model.User
}

func NewUser(user model.User) *User {
	return &User{user: user}
}

func (u User) ID() graphql.ID {
	return graphql.ID(fmt.Sprintf("%d", u.user.ID))
}

func (u User) Name() string {
	return u.user.Name
}
