package loader

import (
	"context"
	"errors"
	"fmt"

	"github.com/davecgh/go-spew/spew"
	"github.com/graph-gophers/dataloader"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
)

type ArticleResult struct {
	Article model.Article
	Error   error
}

type LoadArticlesArg struct {
	IDs []int64
}

func LoadArticles(
	ctx context.Context,
	arg LoadArticlesArg,
) ([]ArticleResult, error) {

	keys := make([]string, len(arg.IDs))

	for i := range arg.IDs {
		keys[i] = fmt.Sprintf("%d", arg.IDs[i])
	}
	spew.Dump(keys)
	ldr, err := getLoader(ctx, articleKey)
	if err != nil {
		return nil, err
	}

	thunk := ldr.LoadMany(
		context.TODO(),
		dataloader.NewKeysFromStrings(keys),
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

func batchLoadArticle(
	ctx context.Context,
	keys dataloader.Keys,
) (rs []*dataloader.Result) {

	as := &model.Articles{}

	err := as.List([]int64{})
	rs = append(rs, &dataloader.Result{Data: as, Error: err})

	return rs
}
