package registry

import (
	"gorm.io/gorm"

	"github.com/ispec-inc/monorepo/go/pkg/mysql"
	"github.com/ispec-inc/monorepo/go/services/article/pkg/domain/repository"
	"github.com/ispec-inc/monorepo/go/services/article/pkg/infra/dao"
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
