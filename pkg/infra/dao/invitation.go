package dao

import (
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
	var invitation entity.Invitation

	err := repo.db.Find(&invitation, ID).Error
	if err != nil {
		return model.Invitation{}, apperror.NewGorm(err)
	}

	return model.Invitation{
		ID:   invitation.ID,
		Code: invitation.Code,
	}, nil
}
