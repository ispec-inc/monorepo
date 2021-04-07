package user

import (
	"github.com/ispec-inc/monorepo/server/pkg/domain/model"
)

type FindCodeOutput struct {
	User model.User
}

type AddCodeOutput struct {
	User model.User
}
