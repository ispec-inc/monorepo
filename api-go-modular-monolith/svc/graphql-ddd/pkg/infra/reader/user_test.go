package reader_test

import (
	"testing"

	"github.com/ispec-inc/monorepo/go/pkg/rdb"
	"github.com/ispec-inc/monorepo/go/pkg/testool"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/entity"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/reader"
	"github.com/stretchr/testify/assert"
)

func TestUser_Get(t *testing.T) {
	type (
		give struct {
			id user.ID
		}
		want struct {
			name user.Name
		}
	)

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "User_Get", []interface{}{
		&entity.User{ID: "uuid", Name: "name", Email: "email"},
	})
	defer cleanup()

	test := struct {
		name string
		give give
		want want
	}{
		give: give{
			id: "uuid",
		},
		want: want{
			name: "name",
		},
	}

	t.Run(test.name, func(t *testing.T) {
		u := reader.NewUser(db)
		usr, err := u.Get(test.give.id)
		assert.NoError(t, err)
		assert.Equal(t, test.want.name, usr.Name)
	})
}

func TestUser_List(t *testing.T) {
	type (
		give struct {
			ids []user.ID
		}
		want struct {
			ids []user.ID
		}
	)

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "User_Get", []interface{}{
		&entity.User{ID: "uuid", Name: "name", Email: "email"},
		&entity.User{ID: "uuid 2", Name: "name 2", Email: "email 2"},
	})
	defer cleanup()

	test := struct {
		name string
		give give
		want want
	}{
		give: give{
			ids: []user.ID{"uuid", "uuid 2"},
		},
		want: want{
			ids: []user.ID{"uuid", "uuid 2"},
		},
	}

	t.Run(test.name, func(t *testing.T) {
		u := reader.NewUser(db)
		usrs, err := u.List(test.give.ids)
		assert.NoError(t, err)
		for i := range test.give.ids {
			assert.Equal(t, test.want.ids[i], usrs[i].ID)
		}
	})
}
