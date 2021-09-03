package loader

import (
	"context"
	"fmt"

	"github.com/graph-gophers/dataloader"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
)

type ArticleResult struct {
	Article model.Article
	Error   error
}

// ctxからloaderをとってくる func LoadArticlesByUserID(ctx context.Context, userID int64) ([]ArticleResult, error) {
func LoadArticlesByUserID(ctx context.Context, userID int64) (*model.Articles, error) {
	ldr, err := getLoader(ctx, articleByUserKey)
	if err != nil {
		return nil, err
	}
	thunk := ldr.Load(ctx, dataloader.StringKey(fmt.Sprintf("%d", userID)))
	data, err := thunk()
	if err != nil {
		return nil, err
	}
	as, ok := data.(*model.Articles)
	if !ok {
		return nil, ErrLoaderResultTyping
	}
	return as, nil
}

// userIDを束ねてarticlesをまとめて取得
func batchLoadArticlesByUserID(ctx context.Context, keys dataloader.Keys) []*dataloader.Result {
	ids := extractIDsFromKeys(keys)
	as := &model.Articles{}
	err := as.ListByUserIDs(ids)

	rs := make([]*dataloader.Result, len(keys))
	for i := range ids {
		id := ids[i]
		var data model.Articles
		for _, a := range *as {
			if a.UserID == id {
				data = append(data, a)
			}
		}
		rs[i] = &dataloader.Result{Data: &data, Error: err}
	}
	return rs
}
