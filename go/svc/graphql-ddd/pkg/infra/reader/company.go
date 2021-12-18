package reader

import (
	"github.com/ispec-inc/monorepo/go/pkg/apperror"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/company"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/entity"
	"gorm.io/gorm"
)

type Company struct {
	db *gorm.DB
}

func NewCompany(db *gorm.DB) Company {
	return Company{
		db,
	}
}

func (c Company) GetByUserID(id user.ID) (*company.Company, error) {
	e := entity.Company{}
	err := c.defaultScope().
		Joins("join user_companies on user_companies.company_id = companies.id").
		Where("user_companies.user_id = ?", id).Find(&e).Error
	if err != nil {
		return nil, apperror.NewGormFind(err, entity.CompanyModelName)
	}

	m := e.ToModel()
	return &m, nil
}

func (c Company) defaultScope() *gorm.DB {
	return c.db.Preload("CompanyDetail")
}
