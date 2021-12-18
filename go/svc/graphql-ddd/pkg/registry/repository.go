package registry

import (
	"gorm.io/gorm"

	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/query"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/reader"
)

var repo Repository

func GetRepository() Repository {
	return repo
}

type Repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) (Repository, func() error, error) {
	repo = Repository{
		db: db,
	}
	cleanup := func() error { return nil }
	return repo, cleanup, nil
}

func (repo Repository) NewCallQuery() query.Call {
	return reader.NewCall(repo.db)
}

func (repo Repository) NewRecordingQuery() query.Recording {
	return reader.NewRecording(repo.db)
}

func (repo Repository) NewUserQuery() query.User {
	return reader.NewUser(repo.db)
}

func (repo Repository) NewCompanyQuery() query.Company {
	return reader.NewCompany(repo.db)
}
