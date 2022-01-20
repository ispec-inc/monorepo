package entity

import "time"

const (
	FirebaseAccountDetailModelName = "FirebaseAccountDetail"
	FirebaseAccountDetailTableName = "firebase_account_details"
)

type FirebaseAccountDetail struct {
	ID                int64     `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	FirebaseAccountID int64     `gorm:"column:firebase_account_id;type:bigint;"`
	FirebaseServiceID string    `gorm:"column:firebase_service_id;type:varchar;size:255;"`
	CreatedAt         time.Time `gorm:"column:created_at;type:datetime;"`
	UpdatedAt         time.Time `gorm:"column:updated_at;type:datetime;"`
}
