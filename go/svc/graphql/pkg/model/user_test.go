package model

import (
	"testing"

	"github.com/ispec-inc/monorepo/go/pkg/infra/entity"
	"github.com/ispec-inc/monorepo/go/pkg/rdb"
	"github.com/ispec-inc/monorepo/go/pkg/testool"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/database"
	"github.com/stretchr/testify/assert"
)

func TestUserModel_Find(t *testing.T) {
	type (
		give struct {
			id uint
		}
		want struct {
			id uint
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
			give: give{id: uint(1)},
			want: want{id: uint(1)},
			err:  false,
		},
		{
			name: "not found",
			give: give{id: uint(2)},
			want: want{id: uint(0)},
			err:  true,
		},
	}

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "user_model_find", []interface{}{
		&entity.User{ID: uint(1)},
	})
	database.Init(db)
	defer cleanup()

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			atl := &User{}
			err := atl.Find(tt.give.id)
			assert.Equal(t, tt.err, err != nil)
			assert.Equal(t, tt.want.id, atl.ID)
		})
	}
}

func TestUserModel_Create(t *testing.T) {
	type (
		give struct {
			user *User
		}
		want struct {
			changedCount int
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
			give: give{user: NewUser("new name", "desc")},
			want: want{changedCount: 1},
			err:  false,
		},
		{
			name: "empty body",
			give: give{user: NewUser("new name", "desc")},
			want: want{changedCount: 0},
			err:  true,
		},
	}

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "user_model_create", []interface{}{
		&entity.User{ID: uint(1)},
	})
	database.Init(db)
	defer cleanup()

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			bcnt := testool.CountRecord(t, db, entity.UserTableName)
			err := tt.give.user.Create()
			acnt := testool.CountRecord(t, db, entity.UserTableName)
			assert.Equal(t, tt.err, err != nil)
			assert.Equal(t, tt.want.changedCount, acnt-bcnt)
		})
	}
}

func TestUserModel_Save(t *testing.T) {
	type (
		give struct {
			user *User
		}
		want struct {
			name string
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
			give: give{user: NewUser("new name", "desc")},
			want: want{name: "new name"},
			err:  false,
		},
		{
			name: "empty name",
			give: give{user: NewUser("", "desc")},
			want: want{name: ""},
			err:  true,
		},
	}

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "user_model_save", []interface{}{
		&entity.User{ID: uint(1)},
	})
	database.Init(db)
	defer cleanup()

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			err := tt.give.user.Save()
			atl := &entity.User{}
			db.First(atl, tt.give.user.ID)
			assert.Equal(t, tt.err, err != nil)
			assert.Equal(t, tt.want.name, atl.Name)
		})
	}
}

func TestUserModel_Delete(t *testing.T) {
	type (
		give struct {
			id uint
		}
		want struct {
			changedCount int
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
			give: give{id: uint(1)},
			want: want{changedCount: -1},
			err:  false,
		},
	}

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "user_model_delete", []interface{}{
		&entity.User{ID: uint(1)},
	})
	database.Init(db)
	defer cleanup()

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			atl := &User{}
			atl.Find(tt.give.id)
			bcnt := testool.CountRecord(t, db, entity.UserTableName)
			err := atl.Delete()
			acnt := testool.CountRecord(t, db, entity.UserTableName)
			assert.Equal(t, tt.err, err != nil)
			assert.Equal(t, tt.want.changedCount, acnt-bcnt)
		})
	}
}

func TestUsersModel_Find(t *testing.T) {
	type (
		want struct {
			count int
		}
	)
	tests := []struct {
		name string
		want want
		err  bool
	}{
		{
			name: "success",
			want: want{count: 1},
			err:  false,
		},
	}

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "users_model_find", []interface{}{
		&entity.User{ID: uint(1)},
	})
	database.Init(db)
	defer cleanup()

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			atls := &Users{}
			err := atls.Find()
			assert.Equal(t, tt.err, err != nil)
			assert.Equal(t, tt.want.count, len(*atls))
		})
	}
}
