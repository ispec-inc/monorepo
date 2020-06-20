package registry

import (
	"github.com/ispec-inc/go-distributed-monolith/pkg/infra/dao"
	"github.com/ispec-inc/go-distributed-monolith/pkg/mysql"
	"github.com/ispec-inc/go-distributed-monolith/src/account/invitation"
)

func NewInvitationUsecase() invitation.Usecase {
	db := mysql.GetConnection()
	return invitation.NewUsecase(
		dao.NewInvitation(db),
	)
}
