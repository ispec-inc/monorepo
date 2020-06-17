package dao

import (
	"errors"
	"fmt"

	"github.com/jinzhu/gorm"

	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
	"github.com/ispec-inc/go-distributed-monolith/pkg/infra/entity"
)

type Invitation struct {
	db *gorm.DB
}

func NewInvitation(db *gorm.DB) Invitation {
	return Invitation{db}
}

func (repo Invitation) Find(ID int64) (model.Invitation, error) {
	var invitation entity.Invitation

	repo.db.Find(&invitation, ID)
	if invitation.ID == 0 {
		return model.Invitation{},
			errors.New(fmt.Sprintf("invitation code (id = %d) is not found.", ID))
	}

	return model.Invitation{
		ID:   invitation.ID,
		Code: invitation.Code,
	}, nil
}
