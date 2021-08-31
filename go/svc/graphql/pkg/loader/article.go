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

// entrypoint userのresolverから呼ばれる方
func LoadArticlesByUserID(
	ctx context.Context,
	userID int64,
) (*model.Articles, error) {
	// ctxからloaderを取ってくる (requestのスコープでloaderを共有)
	ldr, err := getLoader(ctx, articleByUserKey)
	if err != nil {
		return nil, err
	}

	// userIDを指定して16ms待つ!!
	thunk := ldr.Load(
		ctx,
		dataloader.StringKey(fmt.Sprintf("%d", userID)),
	)
	data, err := thunk() // model.Articles
	if err != nil {
		return nil, err
	}

	as, ok := data.(*model.Articles)
	if !ok {
		return nil, ErrLoaderResultTyping
	}

	return as, nil
}

func batchLoadArticleByUserIDs(
	ctx context.Context,
	keys dataloader.Keys,
) []*dataloader.Result {
	ids := extractIDsFromKeys(keys)
	as := &model.Articles{}

	err := as.ListByUserIDs(ids)

	rs := make([]*dataloader.Result, len(keys))

	data := as.ToMapByUserID()
	for i := range ids {
		r := &dataloader.Result{
			Data:  data[ids[i]], // Interface
			Error: err,          // TODO handling
		}
		rs[i] = r
	}

	return rs
}
