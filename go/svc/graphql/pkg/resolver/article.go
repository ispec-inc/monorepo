package resolver

import (
	"context"
	"fmt"
	"strconv"

	"github.com/graph-gophers/dataloader"
	graphql "github.com/graph-gophers/graphql-go"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
)

type Article struct {
	article model.Article
}

func NewArticle(article model.Article) *Article {
	return &Article{article: article}
}

func (a Article) ID() graphql.ID {
	return graphql.ID(fmt.Sprintf("%d", a.article.ID))
}

func (a Article) Title() string {
	return a.article.Title
}

func (a Article) Writer() (*User, error) {
	loader := dataloader.NewBatchedLoader(a.batchWriter)

	id := fmt.Sprintf("%d", a.article.UserID)
	thunk := loader.Load(context.TODO(), dataloader.StringKey(id))
	result, err := thunk()
	if err != nil {
		return nil, err
	}

	u := result.(*model.Users)
	var user model.User
	if len(*u) > 0 {
		user = (*u)[0]
	}
	return NewUser(user), nil
}

func (a Article) batchWriter(
	ctx context.Context,
	keys dataloader.Keys,
) (
	rs []*dataloader.Result,
) {
	us := &model.Users{}

	ids := make([]int64, len(keys))
	for i := range keys {
		id, _ := strconv.Atoi(keys[i].String())
		ids[i] = int64(id)
	}

	err := us.List(ids)
	rs = append(rs, &dataloader.Result{Data: us, Error: err})

	return rs
}
