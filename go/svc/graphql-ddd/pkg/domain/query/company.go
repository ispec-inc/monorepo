package query

import (
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/company"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
)

type Company interface {
	GetByUserID(user.ID) (*company.Company, error)
}
