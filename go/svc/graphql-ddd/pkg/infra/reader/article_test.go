package reader_test

import (
	"testing"

	"github.com/ispec-inc/monorepo/go/pkg/rdb"
	"github.com/ispec-inc/monorepo/go/pkg/testool"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/article"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/entity"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/reader"
	"github.com/stretchr/testify/assert"
)

func TestArticle_Get(t *testing.T) {
	type (
		give struct {
			id article.ID
		}
		want struct {
			title article.Title
		}
	)

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "Article_Get", []interface{}{
		&entity.User{ID: "uuid", Name: "name", Email: "email"},
		&entity.Article{ID: "uuid", Title: "title", UserID: "uuid"},
	})
	defer cleanup()

	test := struct {
		title string
		give  give
		want  want
	}{
		give: give{
			id: "uuid",
		},
		want: want{
			title: "title",
		},
	}

	t.Run(test.title, func(t *testing.T) {
		a := reader.NewArticle(db)
		atcl, err := a.Get(test.give.id)
		assert.NoError(t, err)
		assert.Equal(t, test.want.title, atcl.Title)
	})
}

func TestArticle_List(t *testing.T) {
	type (
		give struct {
			ids []article.ID
		}
		want struct {
			ids []article.ID
		}
	)

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "Article_Get", []interface{}{
		&entity.User{ID: "uuid", Name: "name", Email: "email"},
		&entity.User{ID: "uuid 2", Name: "name 2", Email: "email 2"},
		&entity.Article{ID: "uuid", Title: "title", UserID: "uuid"},
		&entity.Article{ID: "uuid 2", Title: "title 2", UserID: "uuid 2"},
	})
	defer cleanup()

	test := struct {
		title string
		give  give
		want  want
	}{
		give: give{
			ids: []article.ID{"uuid", "uuid 2"},
		},
		want: want{
			ids: []article.ID{"uuid", "uuid 2"},
		},
	}

	t.Run(test.title, func(t *testing.T) {
		a := reader.NewArticle(db)
		atcls, err := a.List(test.give.ids)
		assert.NoError(t, err)
		for i := range test.give.ids {
			assert.Equal(t, test.want.ids[i], atcls[i].ID)
		}
	})
}
