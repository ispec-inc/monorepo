package service

import (
	"github.com/ispec-inc/monorepo/go/pkg/pagination"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/call"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
	"gorm.io/gorm"
)

type CallPagination struct {
	db *gorm.DB
}

func NewCallPagination(db *gorm.DB) CallPagination {
	return CallPagination{
		db,
	}
}

func (c CallPagination) ListByParticipantID(id user.ID, args call.PaginationArgs) (*call.PaginationOutput, error) {

	q := c.db.Table("calls").
		Joins("join call_participants on call_participants.call_id = calls.id").
		Where("call_participants.user_id = ?", id)

	ids, err := c.paging(q, args)
	if err != nil {
		return nil, err
	}

	first, err := c.first(q)
	if err != nil {
		return nil, err
	}

	last, err := c.last(q)
	if err != nil {
		return nil, err
	}

	count, err := c.total(q)
	if err != nil {
		return nil, err
	}

	return &call.PaginationOutput{
		IDList:     ids,
		FirstID:    first,
		LastID:     last,
		TotalCount: count,
	}, nil
}

func (c CallPagination) ListByTeamUserID(id user.ID, args call.PaginationArgs) (*call.PaginationOutput, error) {

	q := c.db.Table("calls").
		Joins("join call_brawsable_teams on call_brawsable_teams.call_id = calls.id").
		Joins("join team_users on team_users.team_id = call_brawsable_teams.team_id").
		Where("team_users.user_id = ?", id)

	ids, err := c.paging(q, args)
	if err != nil {
		return nil, err
	}

	first, err := c.first(q)
	if err != nil {
		return nil, err
	}

	last, err := c.last(q)
	if err != nil {
		return nil, err
	}

	count, err := c.total(q)
	if err != nil {
		return nil, err
	}

	return &call.PaginationOutput{
		IDList:     ids,
		FirstID:    first,
		LastID:     last,
		TotalCount: count,
	}, nil
}

func (c CallPagination) paging(q *gorm.DB, args call.PaginationArgs) ([]call.ID, error) {
	if args.First != nil {
		q = q.Limit(int(*args.First))
	}

	if args.After != nil {
		id, err := pagination.DecodeCursor(*args.After)
		if err != nil {
			return nil, err
		}
		q = q.Where("calls.id > ?", id)
	}

	if args.Last != nil {
		q = q.Limit(int(*args.Last)).Order("calls.id desc")
	}

	if args.Before != nil {
		id, err := pagination.DecodeCursor(*args.Before)
		if err != nil {
			return nil, err
		}
		q = q.Where("calls.id < ?", id)
	}

	var ids []struct {
		ID int64
	}
	if err := q.Select("calls.id").Find(&ids).Error; err != nil {
		return nil, err
	}

	idlist := make([]call.ID, len(ids))
	for i := range ids {
		idlist[i] = call.ID(ids[i].ID)
	}
	return idlist, nil
}

func (c CallPagination) first(q *gorm.DB) (call.ID, error) {
	var id int64
	if err := q.Select("calls.id").First(&id).Error; err != nil {
		return 0, err
	}

	return call.ID(id), nil
}

func (c CallPagination) last(q *gorm.DB) (call.ID, error) {
	var id int64
	if err := q.Select("calls.id").Last(&id).Error; err != nil {
		return 0, err
	}

	return call.ID(id), nil
}

func (c CallPagination) total(q *gorm.DB) (int, error) {
	var count int64
	if err := q.Count(&count).Error; err != nil {
		return 0, err
	}

	return int(count), nil
}
