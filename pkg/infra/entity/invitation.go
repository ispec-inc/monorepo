package entity

import (
	"time"

	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
)

type Invitation struct {
	ID        int64     `gorm:"column:id"`
	UserID    int64     `gorm:"column:user_id"`
	Code      string    `gorm:"column:code"`
	CreatedAt time.Time `gorm:"column:created_at"`
	UpdatedAt time.Time `gorm:"column:updated_at"`
}

func NewInvitationFromModel(
	m model.Invitation,
) Invitation {
	return Invitation{
		ID:     m.ID,
		UserID: m.UserID,
		Code:   m.Code,
	}
}

func (i Invitation) ToModel() model.Invitation {
	return model.Invitation{
		ID:     i.ID,
		UserID: i.UserID,
		Code:   i.Code,
	}
}
