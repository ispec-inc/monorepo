package user

import (
	"github.com/ispec-inc/monorepo/server/pkg/domain/model"
)

type GetOutput struct {
	User *model.User
}

type CreateOutput struct {
	Users []*model.User
}
