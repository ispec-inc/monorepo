package entity

import (
	"time"

	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/company"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/value"
)

const (
	CompanyModelName = "Company"
	CompanyTableName = "companies"
)

type Company struct {
	ID            int64         `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	CompanyDetail CompanyDetail `gorm:"foreignKey:CompanyID;references:ID"`
	CreatedAt     time.Time     `gorm:"column:created_at;type:datetime;"`
	UpdatedAt     time.Time     `gorm:"column:updated_at;type:datetime;"`
}

func (c Company) ToModel() company.Company {
	return company.Company{
		ID:      value.ID(c.ID),
		Name:    c.CompanyDetail.Name,
		IconURL: company.IconURL(c.CompanyDetail.IconURL),
	}
}
