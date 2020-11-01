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

func (repo Invitation) Find(id int64) (model.Invitation, apperror.Error) {
	var inv entity.Invitation
	if err := repo.db.Find(&inv, id).Error; err != nil {
		return model.Invitation{}, apperror.NewGorm(
			err, "error searching invitation in database",
		)
	}

	return inv.ToModel(), nil
}

func (repo Invitation) Create(minv model.Invitation) (
	model.Invitation, apperror.Error,
) {
	tx := repo.db.Begin()

	var invs []entity.Invitation
	err := tx.
		Set("gorm:query_option", "for update").
		Find(&invs, "user_id = ?", minv.UserID).
		Error
	if err != nil {
		tx.Rollback()
		return model.Invitation{}, apperror.NewGorm(
			err, "error searching invitation in database",
		)
	}
	if len(invs) > 0 {
		tx.Rollback()
		return model.Invitation{}, apperror.New(
			apperror.CodeInvalid,
			errors.New("error: invitation code is already exists"),
		)
	}

	inv := entity.NewInvitationFromModel(minv)
	if err := tx.Create(&inv).Error; err != nil {
		tx.Rollback()
		return model.Invitation{}, apperror.NewGorm(
			err, "error inserting invitation in database",
		)
	}

	tx.Commit()
	return inv.ToModel(), nil
}
