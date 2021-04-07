package registry

import (
	"gorm.io/gorm"

	"github.com/ispec-inc/monorepo/server/pkg/domain/repository"
	"github.com/ispec-inc/monorepo/server/pkg/infra/dao"
	"github.com/ispec-inc/monorepo/server/pkg/mysql"
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

func (repo Repository) NewUser() repository.User {
	return dao.NewUser(repo.db)
}
