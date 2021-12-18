package entity

import (
	"time"

	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/call"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/recording"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
)

const (
	CallModelName = "Call"
	CallTableName = "calls"
)

type Call struct {
	ID               int64             `gorm:"primary_key;AUTO_INCREMENT;column:id;type:bigint;"`
	CreatedAt        time.Time         `gorm:"column:created_at;type:datetime;"`
	UpdatedAt        time.Time         `gorm:"column:updated_at;type:datetime;"`
	CallDetail       CallDetail        `gorm:"foreignKey:CallID;references:ID"`
	CallHost         CallHost          `gorm:"foreignKey:CallID;references:ID"`
	CallParticipants []CallParticipant `gorm:"foreignKey:CallID;references:ID"`
	Recording        Recording         `gorm:"foreignKey:CallID;references:ID"`
}

func (c Call) ToModel() *call.Call {

	pids := make([]user.ID, len(c.CallParticipants))

	for i := range c.CallParticipants {
		p := c.CallParticipants[i]
		pids[i] = user.ID(p.UserID)
	}
	m := call.GetCall(
		call.ID(c.ID),
		call.Title(c.CallDetail.Title),
		call.CallStatusSaved,
		user.ID(c.CallHost.UserID),
		recording.ID(c.Recording.ID),
		pids,
		c.CallDetail.StartedAt,
	)
	return &m
}
