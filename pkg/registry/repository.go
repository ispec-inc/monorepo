package registry

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"

	"github.com/ispec-inc/go-distributed-monolith/pkg/config"
	"github.com/ispec-inc/go-distributed-monolith/pkg/infra/dao"
	"github.com/ispec-inc/go-distributed-monolith/src/account/invitation"
)

func NewInvitationUsecase() (invitation.Usecase, error) {
	rds := config.NewRDS()
	db, err := newRDSDB(rds)
	return invitation.NewUsecase(
		dao.NewInvitation(db),
	), err
}

func newRDSDB(rds config.RDS) (*gorm.DB, error) {
	db, err := gorm.Open(rds.DBMS, rds.CONNECT)
	return db, err
}
