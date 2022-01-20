package entity

const (
	FirebaseAccountUserModelName = "FirebaseAccountUser"
	FirebaseAccountUserTableName = "firebase_account_users"
)

type FirebaseAccountUser struct {
	ID                int64 `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	FirebaseAccountID int64 `gorm:"column:firebase_accounts_id;type:bigint;"`
	UserID            int64 `gorm:"column:users_id;type:bigint;"`
}
