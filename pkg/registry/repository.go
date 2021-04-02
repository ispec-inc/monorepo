package registry

import (
	"gorm.io/gorm"

	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/repository"
	"github.com/ispec-inc/go-distributed-monolith/pkg/infra/dao"
	"github.com/ispec-inc/go-distributed-monolith/pkg/mysql"
)

type Repository struct {
	db *gorm.DB
}

func NewRepository() (Repository, func() error, error) {
	db, err := mysql.New()
	if err != nil {
		return Repository{}, func() error { return nil }, err
	}

	repo := Repository{
		db: db,
	}
	cleanup := func() error { return nil }
	return repo, cleanup, nil
}

func (repo Repository) NewInvitation() repository.Invitation {
	return dao.NewInvitation(repo.db)
}
