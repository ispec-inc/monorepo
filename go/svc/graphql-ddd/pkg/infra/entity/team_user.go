package entity

import "time"

const (
	TeamUserModelName = "TeamUser"
	TeamUserTableName = "team_users"
)

type TeamUser struct {
	ID        int64     `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	TeamID    int64     `gorm:"column:team_id;type:bigint;"`
	UserID    int64     `gorm:"column:user_id;type:bigint;"`
	CreatedAt time.Time `gorm:"column:created_at;type:datetime;"`
	UpdatedAt time.Time `gorm:"column:updated_at;type:datetime;"`
}
