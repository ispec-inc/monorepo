package entity

import "time"

const (
	UserCompanyModelName = "UserCompany"
	UserCompanyTableName = "user_companies"
)

type UserCompany struct {
	ID        int64     `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	CompanyID int64     `gorm:"column:company_id;type:bigint;"`
	UserID    int64     `gorm:"column:user_id;type:bigint;"`
	CreatedAt time.Time `gorm:"column:created_at;type:datetime;"`
	UpdatedAt time.Time `gorm:"column:updated_at;type:datetime;"`
}
