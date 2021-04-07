package view

import (
	"github.com/ispec-inc/monorepo/server/pkg/domain/model"
)

type UserCode struct {
	ID     int64  `json:"id"`
	UserID int64  `json:"user_id"`
	Code   string `json:"code"`
}

func NewUserCode(m model.User) UserCode {
	return UserCode{
		ID:     m.ID,
		UserID: m.UserID,
		Code:   m.Code,
	}
}
