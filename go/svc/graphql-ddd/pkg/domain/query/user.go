package query

import "github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"

type User interface {
	Get(user.ID) (user.User, error)
	List([]user.ID) ([]user.User, error)
}
