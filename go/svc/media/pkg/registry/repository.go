package registry

import (
	"gorm.io/gorm"

	"github.com/ispec-inc/monorepo/go/pkg/aws"
	"github.com/ispec-inc/monorepo/go/pkg/config"
	"github.com/ispec-inc/monorepo/go/pkg/mysql"
	"github.com/ispec-inc/monorepo/go/svc/media/pkg/domain/repository"
	"github.com/ispec-inc/monorepo/go/svc/media/pkg/infra/dao"
)

type Repository struct {
	db  *gorm.DB
	aws aws.AWS
}

func NewRepository() (Repository, func() error, error) {
	db, err := mysql.New()
	if err != nil {
		return Repository{}, func() error { return nil }, err
	}

	r := Repository{
		db:  db,
		aws: aws.NewAWS(config.AWS.AccessKey, config.AWS.SecretKey),
	}
	cleanup := func() error { return nil }
	return r, cleanup, nil
}

func (r Repository) NewImage() repository.Image {
	return dao.NewS3(r.aws)
}
