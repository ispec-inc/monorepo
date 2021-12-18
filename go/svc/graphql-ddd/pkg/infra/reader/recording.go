package reader

import (
	"github.com/ispec-inc/monorepo/go/pkg/apperror"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/recording"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/entity"
	"gorm.io/gorm"
)

type Recording struct {
	db *gorm.DB
}

func NewRecording(db *gorm.DB) Recording {
	return Recording{
		db,
	}
}

func (d Recording) List(ids []recording.ID) (*recording.RecordingList, error) {
	es := []entity.Recording{}
	if err := d.defaultScope().Where("id in ?", ids).Find(&es).Error; err != nil {
		return nil, apperror.NewGormFind(err, entity.RecordingModelName)
	}

	ms := make(recording.RecordingList, len(es))
	for i := range es {
		ms[i] = es[i].ToModel()
	}
	return &ms, nil
}

func (d Recording) Get(id recording.ID) (*recording.Recording, error) {
	e := entity.Recording{}
	if err := d.defaultScope().First(&e, id).Error; err != nil {
		return nil, apperror.NewGormFind(err, entity.RecordingModelName)
	}

	m := e.ToModel()
	return &m, nil
}

func (d Recording) defaultScope() *gorm.DB {
	return d.db.
		Preload("RecordingDetail").
		Preload("S3RecordingURL")
}
