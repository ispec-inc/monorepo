package registry

import (
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/call"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/recording"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/service"
	"gorm.io/gorm"
)

type Service struct {
	db *gorm.DB
}

func NewService(
	db *gorm.DB,
) Service {
	return Service{
		db: db,
	}
}

func (s Service) NewStorageService() recording.StorageService {
	return service.NewLocalStorage()
}

func (s Service) NewSeekThumbnailService() recording.SeekThumbnailService {
	return service.NewLocalSeekThumbnailService()
}

func (s Service) NewCallPagination() call.PaginationService {
	return service.NewCallPagination(s.db)
}
