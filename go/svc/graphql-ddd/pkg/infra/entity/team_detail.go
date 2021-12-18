package entity

import "time"

const (
	TeamDetailModelName = "TeamDetail"
	TeamDetailTableName = "team_details"
)

type TeamDetail struct {
	ID        int64     `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	Name      string    `gorm:"column:name;type:varchar;size:255;"`
	TeamID    int64     `gorm:"column:team_id;type:bigint;"`
	CreatedAt time.Time `gorm:"column:created_at;type:datetime;"`
	UpdatedAt time.Time `gorm:"column:updated_at;type:datetime;"`
}
