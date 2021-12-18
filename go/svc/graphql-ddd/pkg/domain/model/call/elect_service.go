package call

import "github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"

func ElectHost(users user.UserList) user.User {
	return users[0]
}
