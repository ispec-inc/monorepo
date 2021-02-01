//go:generate go run github.com/golang/mock/mockgen -source=logger.go -destination=mock/logger.go
//go:generate go run github.com/ispec-inc/civgen-go/mockio -source=logger.go -destination=mockio/logger.go

package service

import (
	"context"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
)

type Logger interface {
	SetUser(ctx context.Context, userID int64, userName string) context.Context
	Error(ctx context.Context, aerr apperror.Error)
}
