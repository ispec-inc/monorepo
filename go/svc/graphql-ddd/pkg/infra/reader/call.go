package reader

import (
	"github.com/ispec-inc/monorepo/go/pkg/apperror"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/call"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/entity"
	"gorm.io/gorm"
)

type Call struct {
	db *gorm.DB
}

func NewCall(db *gorm.DB) Call {
	return Call{
		db,
	}
}

func (d Call) Get(id call.ID) (*call.Call, error) {
	e := entity.Call{}
	if err := d.defaultScope().Find(&e, id).Error; err != nil {
		return nil, apperror.NewGormFind(err, entity.CallModelName)
	}

	m := e.ToModel()
	return m, nil
}

func (d Call) List(ids []call.ID) (*[]call.Call, error) {
	es := []entity.Call{}
	if err := d.defaultScope().Where("id in ?", ids).Find(&es).Error; err != nil {
		return nil, apperror.NewGormFind(err, entity.CallModelName)
	}

	ms := make([]call.Call, len(es))
	for i := range es {
		ms[i] = *es[i].ToModel()
	}
	return &ms, nil
}

func (d Call) defaultScope() *gorm.DB {
	return d.db.
		Preload("CallDetail").
		Preload("CallHost").
		Preload("CallParticipants").
		Preload("Recording")
}
