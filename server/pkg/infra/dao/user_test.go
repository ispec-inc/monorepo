package dao

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/ispec-inc/monorepo/server/pkg/domain/model"
	"github.com/ispec-inc/monorepo/server/pkg/infra/dao/test"
	"github.com/ispec-inc/monorepo/server/pkg/infra/entity"
)

func TestUserDao_Find(t *testing.T) {
	db, cleanup := test.Prepare(t, "user_dao_find", []interface{}{
		&entity.User{ID: int64(1), UserID: int64(1), Code: "foo"},
	})
	defer cleanup()
	d := NewUser(db)

	type (
		give struct {
			id int64
		}
		want struct {
			id int64
		}
	)
	tests := []struct {
		name string
		give give
		want want
		err  bool
	}{
		{
			name: "success",
			give: give{id: int64(1)},
			want: want{id: int64(1)},
		},
		{
			name: "not found",
			give: give{id: int64(2)},
			want: want{id: int64(0)},
			err:  true,
		},
	}
	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			got, aerr := d.Find(tt.give.id)
			if tt.err {
				assert.Error(t, aerr)
			} else {
				assert.NoError(t, aerr)
				assert.Exactly(t, tt.want.id, got.ID)
			}
		})
	}
}

func TestUserDao_FindByUserID(t *testing.T) {
	db, cleanup := test.Prepare(t, "user_dao_find_by_user_id", []interface{}{
		&entity.User{ID: int64(1), UserID: int64(1), Code: "foo"},
	})
	defer cleanup()
	d := NewUser(db)

	type (
		give struct {
			userID int64
		}
		want struct {
			id int64
		}
	)
	tests := []struct {
		name string
		give give
		want want
		err  bool
	}{
		{
			name: "success",
			give: give{userID: int64(1)},
			want: want{id: int64(1)},
		},
		{
			name: "not found",
			give: give{userID: int64(2)},
			want: want{id: int64(0)},
			err:  true,
		},
	}
	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			got, aerr := d.FindByUserID(tt.give.userID)
			if tt.err {
				assert.Error(t, aerr)
			} else {
				assert.NoError(t, aerr)
				assert.Exactly(t, tt.want.id, got.ID)
			}
		})
	}
}

func TestUserDao_Create(t *testing.T) {
	db, cleanup := test.Prepare(t, "user_dao_create", []interface{}{
		&entity.User{ID: int64(1), UserID: int64(1), Code: "foo"},
	})
	defer cleanup()
	d := NewUser(db)

	type (
		give struct {
			model model.User
		}
		want struct {
			createdCount int
		}
	)
	tests := []struct {
		name string
		give give
		want want
		err  bool
	}{
		{
			name: "success",
			give: give{model: model.User{UserID: int64(2), Code: "code"}},
			want: want{createdCount: 1},
		},
		{
			name: "already existed",
			give: give{model: model.User{UserID: int64(1), Code: "code"}},
			want: want{createdCount: 0},
			err:  true,
		},
	}
	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			bcnt := test.CountRecord(t, db, "users")
			aerr := d.Create(tt.give.model)
			acnt := test.CountRecord(t, db, "users")

			if tt.err {
				assert.Error(t, aerr)
			} else {
				assert.NoError(t, aerr)
				assert.Exactly(t, tt.want.createdCount, acnt-bcnt)
			}
		})
	}
}
