package entity

import "time"

const (
	CallDetailModelName = "CallDetail"
	CallDetailTableName = "call_details"
)

type CallDetail struct {
	ID        int64     `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	CallID    int64     `gorm:"column:call_id;type:bigint;"`
	Title     string    `gorm:"column:title;type:varchar;size:255;"`
	StartedAt time.Time `gorm:"column:started_at;type:datetime;"`
	CreatedAt time.Time `gorm:"column:created_at;type:datetime;"`
	UpdatedAt time.Time `gorm:"column:updated_at;type:datetime;"`
}
