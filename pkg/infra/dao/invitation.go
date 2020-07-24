package dao

import (
	"errors"
	"fmt"

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

	err := repo.db.Find(&inv, ID).Error
	if err != nil {
		e := errors.New(fmt.Sprintf("error searching invitation in database: %v", err))
		return model.Invitation{}, apperror.NewGorm(e)
	}

	return inv.ToModel(), nil
}
