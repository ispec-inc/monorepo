package registry

import (
	"github.com/ispec-inc/go-distributed-monolith/pkg/infra/dao"
	"github.com/ispec-inc/go-distributed-monolith/src/account/invitation"
)

func NewInvitationUsecase() invitation.Usecase {
	return invitation.NewUsecase(
		dao.NewInvitation(),
	)
}
