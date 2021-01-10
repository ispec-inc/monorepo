package registry

import (
	"gorm.io/gorm"

	"github.com/ispec-inc/go-distributed-monolith/pkg/infra/dao"
	"github.com/ispec-inc/go-distributed-monolith/pkg/mysql"
)

type Repository struct {
	db *gorm.DB
}

func NewRepository() (Repository, func() error) {
	db, err := mysql.Init()
	if err != nil {
		panic(err)
	}

	repo := Repository{
		db: db,
	}
	f := func() error { return nil }
	return repo, f
}

func (repo Repository) NewInvitation() dao.Invitation {
	return dao.NewInvitation(repo.db)
}
