package registry

import (
	"github.com/jinzhu/gorm"

	"github.com/ispec-inc/go-distributed-monolith/pkg/config"
	"github.com/ispec-inc/go-distributed-monolith/pkg/infra/dao"
	"github.com/ispec-inc/go-distributed-monolith/src/account/invitation"
)

func NewInvitationUseCase(db *gorm.DB) invitation.Usecase {
	return invitation.NewUsecase(
		dao.NewInvitation(db),
	)
}

func NewRDSDB() *gorm.DB {
	rds := config.NewRDS()
	db, err := gorm.Open(rds.DBMS, rds.CONNECT)
	if err != nil {
		panic(err)
	}
	return db
}
