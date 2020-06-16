package dao

import (
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
	"github.com/ispec-inc/go-distributed-monolith/pkg/infra/entity"
)

type Invitation struct{}

func NewInvitation() Invitation {
	return Invitation{}
}

func (repo Invitation) Find(ID int64) (model.Invitation, error) {
	db, err := ConnectDB()
	if err != nil {
		return model.Invitation{}, err
	}
	defer db.Close()

	var invitation entity.Invitation
	db.Find(&invitation, ID)

	return model.Invitation{
		ID:   invitation.ID,
		Code: invitation.Code,
	}, nil
}
