package dao

import (
	"errors"
	"github.com/jinzhu/gorm"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
	"github.com/ispec-inc/go-distributed-monolith/pkg/infra/entity"
)

type Invitation struct {
	db *gorm.DB
}

func NewInvitation(db *gorm.DB) Invitation {
	return Invitation{db}
}

func (repo Invitation) Find(ID int64) (model.Invitation, apperror.Error) {
	var inv entity.Invitation
	if err := repo.db.Find(&inv, ID).Error; err != nil {
		return model.Invitation{}, apperror.NewGorm(
			err, "error searching invitation in database",
		)
	}

	return inv.ToModel(), nil
}

func (repo Invitation) Create(invModel model.Invitation) (
	model.Invitation, apperror.Error,
) {
	tx := repo.db.Begin()

	var inv entity.Invitation
	err := tx.
		Set("gorm:query_option", "for update").
		First(&inv, "user_id = ?", invModel.UserID).
		Error
	if err != nil && !gorm.IsRecordNotFoundError(err) {
		tx.Rollback()
		return model.Invitation{}, apperror.NewGorm(
			err, "error searching invitation in database",
		)
	} else if err == nil {
		tx.Rollback()
		return model.Invitation{}, apperror.New(
			apperror.CodeInvalid,
			errors.New("error: invitation code is already exists"),
		)
	}

	inv = entity.NewInvitationFromModel(invModel)
	if err := tx.Create(&inv).Error; err != nil {
		tx.Rollback()
		return model.Invitation{}, apperror.NewGorm(
			err, "error inserting invitation in database",
		)
	}

	tx.Commit()
	return inv.ToModel(), nil
}
