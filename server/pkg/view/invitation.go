package view

import (
	"github.com/ispec-inc/monorepo/server/pkg/domain/model"
)

type InvitationCode struct {
	ID     int64  `json:"id"`
	UserID int64  `json:"user_id"`
	Code   string `json:"code"`
}

func NewInvitationCode(m model.Invitation) InvitationCode {
	return InvitationCode{
		ID:     m.ID,
		UserID: m.UserID,
		Code:   m.Code,
	}
}
