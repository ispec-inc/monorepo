package entity

import "time"

const (
	CompanyTeamModelName = "CompanyTeam"
	CompanyTeamTableName = "company_teams"
)

type CompanyTeam struct {
	ID        int64     `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	CompanyID int64     `gorm:"column:company_id;type:bigint;"`
	TeamID    int64     `gorm:"column:team_id;type:bigint;"`
	CreatedAt time.Time `gorm:"column:created_at;type:datetime;"`
	UpdatedAt time.Time `gorm:"column:updated_at;type:datetime;"`
}
