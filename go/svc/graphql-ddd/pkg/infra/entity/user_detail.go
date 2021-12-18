package entity

import "time"

const (
	UserDetailModelName = "UserDetail"
	UserDetailTableName = "user_details"
)

type UserDetail struct {
	ID        int64     `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	Name      string    `gorm:"column:name;type:varchar;size:255;"`
	IconURL   string    `gorm:"column:icon_url;type:varchar;size:255;"`
	Privilege int       `gorm:"column:privilege;type:int;"`
	UserID    int64     `gorm:"column:user_id;type:bigint;"`
	CreatedAt time.Time `gorm:"column:created_at;type:datetime;"`
	UpdatedAt time.Time `gorm:"column:updated_at;type:datetime;"`
}
