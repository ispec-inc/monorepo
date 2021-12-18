package resolver

import (
	"fmt"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/company"
)

type Company struct {
	company company.Company
}

func NewCompany(
	company company.Company,
) *Company {
	return &Company{
		company: company,
	}
}

func (c Company) ID() graphql.ID {
	return graphql.ID(fmt.Sprintf("%d", c.company.ID))
}

func (c Company) Name() string {
	return c.company.Name
}

func (c Company) IconURL() string {
	return string(c.company.IconURL)
}
