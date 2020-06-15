package dao

import (
	"github.com/jinzhu/gorm"

	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
	"github.com/ispec-inc/go-distributed-monolith/pkg/infra/entity"
)

type Invitation struct {
	*gorm.DB
}

func NewInvitation(db *gorm.DB) Invitation {
	return Invitation{db}
}

func (repo Invitation) FindByUserID(userID int) model.Invitation {
	var invitation entity.Invitation
	repo.Find(&invitation, "user_id = ?", userID)

	return model.Invitation{
		ID:   invitation.ID,
		Code: invitation.Code,
	}
}
