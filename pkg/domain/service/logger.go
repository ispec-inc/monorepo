package service

import (
	"context"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
)

type Logger interface {
	SetUser(ctx context.Context, userID int64, userName string) context.Context
	Error(ctx context.Context, aerr apperror.Error)
}
