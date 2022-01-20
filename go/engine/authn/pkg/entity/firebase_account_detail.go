package entity

const (
	FirebaseAccountDetailModelName = "FirebaseAccountDetail"
	FirebaseAccountDetailTableName = "firebase_account_details"
)

type FirebaseAccountDetail struct {
	ID                int64  `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	FirebaseAccountID int64  `gorm:"column:firebase_accounts_id;type:bigint;"`
	FirebaseServiceID string `gorm:"column:firebase_service_id;type:varchar;size:255;"`
}
