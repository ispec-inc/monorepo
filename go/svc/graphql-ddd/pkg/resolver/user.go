package resolver

import (
	"fmt"

	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"

	graphql "github.com/graph-gophers/graphql-go"
)

type User struct {
	user user.User
}

func NewUser(
	usr user.User,
) *User {
	return &User{
		user: usr,
	}
}

func (u User) ID() graphql.ID {
	return graphql.ID(fmt.Sprintf("%d", u.user.ID))
}

func (u User) Name() string {
	return u.user.Name
}

func (u User) Privilege() string {
	return u.user.Privilege.Name
}

func (u User) Icon() string {
	return string(u.user.Icon)
}
