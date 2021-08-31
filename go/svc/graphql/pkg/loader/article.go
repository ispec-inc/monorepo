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

func LoadArticlesByUserID(ctx context.Context, uid int64) (*model.Articles, error) {
	// ctxからloaderをとってくる
	ldr, err := getLoader(ctx, articleByUserKey)
	if err != nil {
		return nil, err
	}
	thunk := ldr.Load(ctx, dataloader.StringKey(fmt.Sprintf("%d", uid)))
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
	uids := extractIDsFromKeys(keys)
	as := &model.Articles{}
	err := as.ListByUserIDs(uids)

	rs := make([]*dataloader.Result, len(keys))
	for i := range uids {
		uid := uids[i]
		var data model.Articles
		for _, a := range *as {
			if a.UserID == uid {
				data = append(data, a)
			}
		}
		rs[i] = &dataloader.Result{Data: &data, Error: err}
	}

	return rs
}
