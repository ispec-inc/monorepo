package model

import (
	"github.com/ispec-inc/monorepo/go/engine/authn/pkg/database"
	"github.com/ispec-inc/monorepo/go/engine/authn/pkg/entity"
	"github.com/ispec-inc/monorepo/go/pkg/apperror"
	"gorm.io/gorm"
)

type FirebaseAccount struct {
	entity.FirebaseAccount
}

func NewFirebaseAccount(userID int64, firebaseServiceID string) *FirebaseAccount {
	fa := &FirebaseAccount{}
	fa.FirebaseAccountUser.UserID = userID
	fa.FirebaseAccountDetail.FirebaseServiceID = firebaseServiceID
	return fa
}

func (fa *FirebaseAccount) FindByFirebaseServiceID(firebaseServiceID string) error {
	return apperror.NewGormFind(
		fa.defaultScope().
			Joins("LEFT JOIN firebase_account_details ON firebase_account_details.firebase_accounts_id = firebase_accounts.id").
			Find(fa, "firebase_service_id = ?", firebaseServiceID).
			Limit(1).
			Error,
		entity.FirebaseAccountTableName,
	)
}

func (fa *FirebaseAccount) FindByUserID(userID int64) error {
	return apperror.NewGormFind(
		fa.defaultScope().
			Joins("LEFT JOIN firebase_account_users ON firebase_accounts.id = firebase_account_users.firebase_accounts_id").
			Find(fa, "users_id = ?", userID).
			Limit(1).
			Error,
		entity.FirebaseAccountTableName,
	)
}

func (fa *FirebaseAccount) Create() error {
	return apperror.NewGormCreate(
		database.Get().Create(fa).Error,
		entity.FirebaseAccountTableName,
	)
}

func (fa *FirebaseAccount) defaultScope() *gorm.DB {
	return database.Get().
		Preload("FirebaseAccountDetail").
		Preload("FirebaseAccountUser")
}
