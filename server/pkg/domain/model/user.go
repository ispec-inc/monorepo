package model

import "time"

type User struct {
	ID          int64
	Name        string
	Description string
	Email       string
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
