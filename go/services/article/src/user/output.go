package user

import (
	"github.com/ispec-inc/monorepo/go/services/article/pkg/domain/model"
)

type GetOutput struct {
	User *model.User
}

type CreateOutput struct {
	Users []*model.User
}
