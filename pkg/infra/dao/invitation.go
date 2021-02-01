package dao

import (
	"gorm.io/gorm"

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

func (repo Invitation) Find(id int64) (model.Invitation, error) {
	var inv entity.Invitation
	if err := repo.db.First(&inv, id).Error; err != nil {
		return model.Invitation{}, newGormFindError(err, entity.InvitationModelName)
	}
	return inv.ToModel(), nil
}

func (repo Invitation) FindByUserID(uid int64) (model.Invitation, error) {
	var inv entity.Invitation
	if err := repo.db.First(&inv, "user_id = ?", uid).Error; err != nil {
		return model.Invitation{}, newGormFindError(err, entity.InvitationModelName)
	}
	return inv.ToModel(), nil
}

func (repo Invitation) Create(minv model.Invitation) error {
	f := func(tx *gorm.DB) error {
		var invs []entity.Invitation
		err := tx.
			Set("gorm:query_option", "for update").
			Find(&invs, "user_id = ?", minv.UserID).
			Error
		if err != nil {
			return newGormFindError(err, entity.InvitationModelName)
		}
		if len(invs) > 0 {
			return apperror.New(apperror.CodeInvalid, "invitation code has been already existed")
		}

		inv := entity.NewInvitationFromModel(minv)
		if err := tx.Create(&inv).Error; err != nil {
			return newGormCreateError(err, entity.InvitationModelName)
		}

		return nil
	}

	if err := transaction.Run(repo.db, f); err != nil {
		return err
	}

	return nil
}
