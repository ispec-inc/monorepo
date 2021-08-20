package typedef

import (
	"github.com/graphql-go/graphql"
	"github.com/ispec-inc/monorepo/go/svc/graphql-admin/pkg/gql/gqlobj"
)

type UserTypeResolverRegistryImpl struct {
}

func NewUser() *graphql.Object {

	u := UserTypeResolverRegistryImpl{}
	return gqlobj.UserType(u)
}

var userType = NewUser()
