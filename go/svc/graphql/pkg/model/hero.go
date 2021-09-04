package model

import (
	"errors"

	"github.com/ispec-inc/monorepo/go/pkg/apperror"
	"github.com/ispec-inc/monorepo/go/pkg/infra/entity"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/database"
	"go.uber.org/multierr"
)

type (
	Hero struct {
		entity.Hero
	}
	Heroes []Hero
)

func NewHero(name string, age int, isJedi bool) *Hero {
	h := new(Hero)
	h.Name = name
	h.Age = age
	h.IsJedi = isJedi
	return h
}

func (h *Hero) validate() error {
	var err error
	if h.Name == "" {
		err = multierr.Append(err, errors.New("hero must have name"))
	}
	if err != nil {
		return apperror.WithCode(apperror.CodeInvalid, err)
	}
	return nil
}

func (h *Hero) Find(id int64) error {
	return apperror.NewGormFind(
		database.Get().First(h, id).Error,
		entity.HeroTableName,
	)
}

func (h *Hero) Create() error {
	if err := h.validate(); err != nil {
		return err
	}
	return apperror.NewGormCreate(
		database.Get().Create(h).Error,
		entity.HeroTableName,
	)
}

func (h *Hero) Save() error {
	if err := h.validate(); err != nil {
		return err
	}
	return apperror.NewGormSave(
		database.Get().Save(h).Error,
		entity.HeroTableName,
	)
}

func (h *Hero) Delete() error {
	return apperror.NewGormDelete(
		database.Get().Delete(h).Error,
		entity.HeroTableName,
	)
}

func (hs *Heroes) Find() error {
	return apperror.NewGormFind(
		database.Get().Find(hs).Error,
		entity.HeroTableName,
	)
}

func (hs *Heroes) List(ids []int64) error {
	q := database.Get()
	if len(ids) > 0 {
		q = q.Where("id in ?", ids)
	}
	return apperror.NewGormFind(
		q.Find(hs).Error,
		entity.HeroTableName,
	)
}
