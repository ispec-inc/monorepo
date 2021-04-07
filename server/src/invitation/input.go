package invitation

import (
	"github.com/ispec-inc/monorepo/server/pkg/domain/model"
)

type FindCodeInput struct {
	ID int64
}

type AddCodeInput struct {
	Invitation model.Invitation
}
