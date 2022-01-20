package entity

import "time"

const (
	FirebaseAccountUserModelName = "FirebaseAccountUser"
	FirebaseAccountUserTableName = "firebase_account_users"
)

type FirebaseAccountUser struct {
	ID                int64     `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	FirebaseAccountID int64     `gorm:"column:firebase_account_id;type:bigint;"`
	UserID            int64     `gorm:"column:user_id;type:bigint;"`
	CreatedAt         time.Time `gorm:"column:created_at;type:datetime;"`
	UpdatedAt         time.Time `gorm:"column:updated_at;type:datetime;"`
}
