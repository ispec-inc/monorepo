package loader

import (
	"context"
	"errors"

	"github.com/davecgh/go-spew/spew"
	"github.com/graph-gophers/dataloader"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
)

type ArticleResult struct {
	Article model.Article
	Error   error
}

func LoadArticles(ctx context.Context) ([]ArticleResult, error) {
	spew.Dump(ctx)

	loader := dataloader.NewBatchedLoader(batchLoadArticles)
	thunk := loader.LoadMany(
		context.TODO(),
		dataloader.NewKeysFromStrings([]string{}),
	)
	data, errs := thunk()

	results := make([]ArticleResult, len(data))
	for i, d := range data {
		var e error
		if errs != nil {
			e = errs[i]
		}

		a, ok := d.(model.Article)
		if !ok && e == nil {
			e = errors.New("typing error")
		}

		results[i] = ArticleResult{
			Article: a,
			Error:   e,
		}
	}
	return results, nil
}

func batchLoadArticles(
	ctx context.Context,
	keys dataloader.Keys,
) (rs []*dataloader.Result) {
	spew.Dump(keys)
	as := &model.Articles{}

	err := as.List([]int64{})
	rs = append(rs, &dataloader.Result{Data: as, Error: err})

	return rs
}
