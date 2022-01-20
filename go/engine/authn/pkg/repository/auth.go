package repository

import "context"

type AuthN interface {
	Login(ctx context.Context, idToken string) (accountID string, err error)
	GetEmail(ctx context.Context, userID int64) (email string, err error)
	SignUp(ctx context.Context, email string, userID int64) (err error)
}
