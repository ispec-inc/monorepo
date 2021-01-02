package dao

import (
	"errors"

	"github.com/jinzhu/gorm"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
	"github.com/ispec-inc/go-distributed-monolith/pkg/infra/entity"
	"github.com/ispec-inc/go-distributed-monolith/pkg/transaction"
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
		return model.Invitation{}, NewGormError(
			err, "error searching invitation in database",
		)
	}
	return inv.ToModel(), nil
}

func (repo Invitation) FindByUserID(uid int64) (model.Invitation, apperror.Error) {
	var inv entity.Invitation
	if err := repo.db.Find(&inv, "user_id = ?", uid).Error; err != nil {
		return model.Invitation{}, NewGormError(
			err, "error searching invitation in database",
		)
	}
	return inv.ToModel(), nil
}

func (repo Invitation) Create(minv model.Invitation) apperror.Error {
	f := func(tx *gorm.DB) apperror.Error {
		var invs []entity.Invitation
		err := tx.
			Set("gorm:query_option", "for update").
			Find(&invs, "user_id = ?", minv.UserID).
			Error
		if err != nil {
			return NewGormError(err, "error searching invitation in database")
		}
		if len(invs) > 0 {
			return apperror.New(apperror.CodeInvalid, errors.New("error: invitation code is already exists"))
		}

		inv := entity.NewInvitationFromModel(minv)
		if err := tx.Create(&inv).Error; err != nil {
			return NewGormError(err, "error inserting invitation in database")
		}

		return nil
	}

	if aerr := transaction.Run(repo.db, f); aerr != nil {
		return aerr
	}

	return nil
}
