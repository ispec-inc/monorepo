package registry

import (
	"github.com/ispec-inc/go-distributed-monolith/pkg/config"
	"github.com/ispec-inc/go-distributed-monolith/pkg/infra/dao"
	"github.com/ispec-inc/go-distributed-monolith/src/account/invitation"
)

func NewInvitationUsecase() (invitation.Usecase, error) {
	rds := config.NewRDS()
	db, err := dao.NewRDSDB(rds)
	return invitation.NewUsecase(
		dao.NewInvitation(db),
	), err
}
