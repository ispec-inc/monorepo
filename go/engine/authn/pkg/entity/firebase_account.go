package entity

import (
	"time"
)

const (
	FirebaseAccountModelName = "FirebaseAccount"
	FirebaseAccountTableName = "firebase_accounts"
)

type FirebaseAccount struct {
	ID                    int64                 `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	CreatedAt             time.Time             `gorm:"column:created_at;type:datetime;"`
	UpdatedAt             time.Time             `gorm:"column:updated_at;type:datetime;"`
	FirebaseAccountDetail FirebaseAccountDetail `gorm:"foreignKey:FirebaseAccountID;references:ID"`
	FirebaseAccountUser   FirebaseAccountUser   `gorm:"foreignKey:FirebaseAccountID;references:ID"`
}
