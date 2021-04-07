package view

import (
	"time"

	"github.com/ispec-inc/monorepo/server/pkg/domain/model"
)

type User struct {
	ID          int64     `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Email       string    `json:"email"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func NewUser(m *model.User) *User {
	return &User{
		CreatedAt:   m.CreatedAt,
		Description: m.Description,
		Email:       m.Email,
		ID:          m.ID,
		Name:        m.Name,
		UpdatedAt:   m.UpdatedAt,
	}
}

func NewUsers(ms []*model.User) []*User {
	vs := make([]*User, len(ms))
	for i, m := range ms {
		vs[i] = NewUser(m)
	}
	return vs
}
