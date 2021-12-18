package entity

import "time"

const (
	CallHostModelName = "CallHost"
	CallHostTableName = "call_promoters"
)

type CallHost struct {
	ID        int64     `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	UserID    int64     `gorm:"column:user_id;type:bigint;"`
	CallID    int64     `gorm:"column:call_id;type:bigint;"`
	CreatedAt time.Time `gorm:"column:created_at;type:datetime;"`
	UpdatedAt time.Time `gorm:"column:updated_at;type:datetime;"`
}
