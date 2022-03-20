package seed

import "github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/entity"

func Dev() []interface{} {
	return []interface{}{
		&entity.User{ID: "id", Name: "name", Email: "email"},
	}
}
