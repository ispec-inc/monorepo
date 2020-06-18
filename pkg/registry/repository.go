package registry

import (
	"github.com/ispec-inc/go-distributed-monolith/pkg/infra/dao"
	"github.com/ispec-inc/go-distributed-monolith/pkg/mysql"
	"github.com/ispec-inc/go-distributed-monolith/src/account/invitation"
)

func NewInvitationUsecase() (invitation.Usecase, error) {
	db, err := mysql.NewDB()
	return invitation.NewUsecase(
		dao.NewInvitation(db),
	), err
}
