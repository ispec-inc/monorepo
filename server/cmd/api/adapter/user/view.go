package user

import (
	"github.com/ispec-inc/monorepo/server/pkg/view"
)

type GetCodeResponse struct {
	UserCode view.UserCode `json:"user_code"`
}

type AddCodeResponse struct {
	UserCode view.UserCode `json:"user_code"`
}
