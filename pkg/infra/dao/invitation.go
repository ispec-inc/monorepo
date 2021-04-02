package dao

import (
	"gorm.io/gorm"

	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
	"github.com/ispec-inc/go-distributed-monolith/pkg/infra/entity"
)

type Invitation struct {
	db *gorm.DB
}

func NewInvitation(db *gorm.DB) Invitation {
	return Invitation{db}
}

func (i Invitation) Find(id int64) (model.Invitation, error) {
	var inv entity.Invitation
	if err := i.db.First(&inv, id).Error; err != nil {
		return model.Invitation{}, newGormFindError(err, entity.InvitationModelName)
	}
	return inv.ToModel(), nil
}

func (i Invitation) FindByUserID(uid int64) (model.Invitation, error) {
	var inv entity.Invitation
	if err := i.db.First(&inv, "user_id = ?", uid).Error; err != nil {
		return model.Invitation{}, newGormFindError(err, entity.InvitationModelName)
	}
	return inv.ToModel(), nil
}

func (i Invitation) Create(minv model.Invitation) error {
	e := entity.NewInvitationFromModel(minv)
	if err := i.db.Create(&e).Error; err != nil {
		return newGormCreateError(err, entity.InvitationModelName)
	}
	return nil
}
