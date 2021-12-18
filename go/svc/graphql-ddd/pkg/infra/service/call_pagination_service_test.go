package service

import (
	"testing"

	"github.com/ispec-inc/monorepo/go/pkg/rdb"
	"github.com/ispec-inc/monorepo/go/pkg/testool"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/database"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/call"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/entity"
	"github.com/stretchr/testify/assert"
)

func TestCallPagination_ListByParticipantID(t *testing.T) {
	type (
		give struct {
			uid  user.ID
			args call.PaginationArgs
		}
		want struct {
			ids []call.ID
		}
	)

	var (
		one   = int32(1)
		two   = int32(2)
		three = int32(3)
	)

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "CallPagination_ListByUserID", []interface{}{
		&entity.User{ID: 1},
		&entity.User{ID: 2},
		&entity.Call{ID: 1},
		&entity.CallParticipant{ID: 1, UserID: 1, CallID: 1},
		&entity.Call{ID: 2},
		&entity.CallParticipant{ID: 2, UserID: 1, CallID: 2},
		&entity.Call{ID: 3},
		&entity.CallParticipant{ID: 3, UserID: 2, CallID: 3},
		&entity.CallParticipant{ID: 4, UserID: 1, CallID: 3},
	})
	database.Init(db)
	defer cleanup()

	tests := []struct {
		name string
		give give
		want want
	}{
		{
			name: "get 2 from first",
			give: give{
				uid: user.ID(1),
				args: call.PaginationArgs{
					First: &one,
				},
			},
			want: want{
				ids: []call.ID{1},
			},
		},
		{
			name: "get 2 from first",
			give: give{
				uid: user.ID(1),
				args: call.PaginationArgs{
					Last: &two,
				},
			},
			want: want{
				ids: []call.ID{3, 2},
			},
		},
		{
			name: "get all from first",
			give: give{
				uid: user.ID(2),
				args: call.PaginationArgs{
					Last: &three,
				},
			},
			want: want{
				ids: []call.ID{3},
			},
		},
		{
			name: "get one",
			give: give{
				uid: user.ID(1),
				args: call.PaginationArgs{
					Last: &one,
				},
			},
			want: want{
				ids: []call.ID{3},
			},
		},
	}

	for i := range tests {
		tc := tests[i]
		t.Run(tc.name, func(t *testing.T) {
			s := NewCallPagination(db)
			opt, err := s.ListByParticipantID(tc.give.uid, tc.give.args)
			assert.NoError(t, err)

			assert.Equal(t, tc.want.ids, opt.IDList)
		})
	}
}

func TestCallPagination_ListByTeamUserID(t *testing.T) {
	type (
		give struct {
			uid  call.ID
			args call.PaginationArgs
		}
		want struct {
			ids []call.ID
		}
	)
	var (
		one = int32(1)
		two = int32(2)
	)

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "CallPagination_ListByUserID", []interface{}{
		&entity.User{ID: 1},
		&entity.User{ID: 2},
		&entity.Team{ID: 1},
		&entity.Team{ID: 2},
		&entity.TeamUser{ID: 1, UserID: 1, TeamID: 1},
		&entity.TeamUser{ID: 2, UserID: 2, TeamID: 1},
		&entity.TeamUser{ID: 3, UserID: 1, TeamID: 2},
		&entity.Call{ID: 1},
		&entity.Call{ID: 2},
		&entity.CallBrawsableTeam{ID: 1, TeamID: 1, CallID: 1},
		&entity.CallBrawsableTeam{ID: 2, TeamID: 2, CallID: 2},
		&entity.CallBrawsableTeam{ID: 3, TeamID: 2, CallID: 2},
	})
	database.Init(db)
	defer cleanup()

	tests := []struct {
		name string
		give give
		want want
	}{
		{
			name: "get 2 from first",
			give: give{
				uid: call.ID(1),
				args: call.PaginationArgs{
					First: &two,
				},
			},
			want: want{
				ids: []call.ID{1, 2},
			},
		},
		{
			name: "get one from last",
			give: give{
				uid: call.ID(1),
				args: call.PaginationArgs{
					Last: &one,
				},
			},
			want: want{
				ids: []call.ID{2},
			},
		},
	}

	for i := range tests {
		tc := tests[i]
		t.Run(tc.name, func(t *testing.T) {
			s := NewCallPagination(db)
			opt, err := s.ListByTeamUserID(1, tc.give.args)
			assert.NoError(t, err)

			assert.Equal(t, tc.want.ids, opt.IDList)
		})
	}
}
