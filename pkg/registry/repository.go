package registry

import (
	"github.com/jinzhu/gorm"

	"github.com/ispec-inc/go-distributed-monolith/pkg/infra/dao"
	"github.com/ispec-inc/go-distributed-monolith/pkg/mysql"
)

type Repository struct {
	db *gorm.DB
}

func NewRepository() (Repository, func() error) {
	db, cleanup, err := mysql.Init()
	if err != nil {
		panic(err)
	}

	return Repository{
		db: db,
	}, cleanup
}

func (repo Repository) NewInvitation() dao.Invitation {
	return dao.NewInvitation(repo.db)
}
