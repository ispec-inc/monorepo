package reader

import (
	"testing"

	"github.com/ispec-inc/monorepo/go/pkg/rdb"
	"github.com/ispec-inc/monorepo/go/pkg/testool"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/database"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/entity"
	"github.com/stretchr/testify/assert"
)

func TestUser_Get(t *testing.T) {
	type (
		give struct {
			id user.ID
		}
		want struct {
			id user.ID
		}
	)

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "User_Get", []interface{}{
		&entity.User{ID: 1},
		&entity.UserDetail{ID: 1, UserID: 1},
	})
	database.Init(db)
	defer cleanup()

	tests := []struct {
		name string
		give give
		want want
		err  bool
	}{
		{
			give: give{
				id: user.ID(1),
			},
			want: want{
				id: user.ID(1),
			},
			err: false,
		},
		{
			give: give{
				id: user.ID(2),
			},
			want: want{
				id: user.ID(0),
			},
			err: true,
		},
	}

	for i := range tests {
		test := tests[i]
		t.Run(test.name, func(t *testing.T) {
			u := NewUser(db)
			user, err := u.Get(test.give.id)
			if test.err {
				assert.Error(t, err)
			} else {
				assert.NoError(t, err)
				assert.Equal(t, test.want.id, user.ID)
			}
		})
	}
}

func TestUser_List(t *testing.T) {
	type (
		give struct {
			ids []user.ID
		}
		want struct {
			count int
		}
	)

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "User_List", []interface{}{
		&entity.User{ID: 1},
		&entity.UserDetail{ID: 1, UserID: 1},
		&entity.User{ID: 2},
		&entity.UserDetail{ID: 2, UserID: 2},
	})
	database.Init(db)
	defer cleanup()

	tests := []struct {
		name string
		give give
		want want
	}{
		{
			give: give{
				ids: []user.ID{1, 2},
			},
			want: want{
				count: 2,
			},
		},
		{
			give: give{
				ids: []user.ID{2},
			},
			want: want{
				count: 1,
			},
		},
		{
			give: give{
				ids: []user.ID{4},
			},
			want: want{
				count: 0,
			},
		},
	}

	for i := range tests {
		test := tests[i]
		t.Run(test.name, func(t *testing.T) {
			u := NewUser(db)
			users, err := u.List(test.give.ids)
			assert.NoError(t, err)
			assert.Equal(t, test.want.count, len(*users))
		})
	}
}
