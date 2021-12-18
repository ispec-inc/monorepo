package entity

import "time"

const (
	CompanyDetailModelName = "CompanyDetail"
	CompanyDetailTableName = "company_details"
)

type CompanyDetail struct {
	ID        int64     `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	CompanyID int64     `gorm:"column:company_id;type:bigint;"`
	Name      string    `gorm:"column:name;type:varchar;size:255;"`
	IconURL   string    `gorm:"column:icon_url;type:varchar;size:255;"`
	CreatedAt time.Time `gorm:"column:created_at;type:datetime;"`
	UpdatedAt time.Time `gorm:"column:updated_at;type:datetime;"`
}
