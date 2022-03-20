package writer_test

import (
	"testing"

	"github.com/ispec-inc/monorepo/go/pkg/rdb"
	"github.com/ispec-inc/monorepo/go/pkg/testool"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/article"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/entity"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/reader"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/infra/writer"
	"github.com/stretchr/testify/assert"
)

func TestArticle_Create(t *testing.T) {
	type (
		give struct {
			article article.Article
		}
	)

	db, cleanup := testool.PrepareDB(t, rdb.DBMSMySQL, "Article_Create", []interface{}{
		&entity.User{ID: "uuid", Name: "name", Email: "email"},
	})
	defer cleanup()

	test := struct {
		title string
		give  give
	}{
		give: give{
			article: article.Article{
				ID:      "id",
				Title:   "title",
				Content: "content",
				UserID:  "uuid",
			},
		},
	}

	t.Run(test.title, func(t *testing.T) {
		a := writer.NewArticle(db)
		err := a.Create(test.give.article)
		assert.NoError(t, err)

		r := reader.NewArticle(db)
		atcl, err := r.Get(test.give.article.ID)
		assert.NoError(t, err)
		assert.Equal(t, test.give.article, atcl)
	})
}
