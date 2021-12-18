package entity

import "time"

const (
	CallBrawsableTeamModelName = "CallBrawsableTeam"
	CallBrawsableTeamTableName = "call_brawsable_teams"
)

type CallBrawsableTeam struct {
	ID        int64     `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	CallID    int64     `gorm:"column:call_id;type:bigint;"`
	TeamID    int64     `gorm:"column:team_id;type:bigint;"`
	CreatedAt time.Time `gorm:"column:created_at;type:datetime;"`
	UpdatedAt time.Time `gorm:"column:updated_at;type:datetime;"`
}
