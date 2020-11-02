package invitation

import (
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
)

type FindCodeInput struct {
	ID int64
}

type AddCodeInput struct {
	Invitation model.Invitation
}
