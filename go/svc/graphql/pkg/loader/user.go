package loader

import (
	"context"
	"fmt"

	"github.com/graph-gophers/dataloader"
	"github.com/ispec-inc/monorepo/go/svc/graphql/pkg/model"
)

type UserResult struct {
	User  model.User
	Error error
}

func LoadUsers(
	ctx context.Context,
	ids []int64,
) ([]UserResult, error) {

	loader := dataloader.NewBatchedLoader(batchLoadUser)
	thunk := loader.LoadMany(
		context.TODO(),
		newKeysFromIDs(ids),
	)
	data, errs := thunk()

	results := make([]UserResult, len(data))
	for i, d := range data {
		var e error
		if errs != nil {
			e = errs[i]
		}

		a, ok := d.(model.User)
		if !ok && e == nil {
			e = ErrLoaderResultTyping
		}

		results[i] = UserResult{
			User:  a,
			Error: e,
		}
	}
	return results, nil
}

func LoadUser(
	ctx context.Context,
	id int64,
) (*model.User, error) {
	ldr, err := getLoader(ctx, userKey)
	if err != nil {
		return nil, err
	}

	thunk := ldr.Load(
		ctx,
		dataloader.StringKey(fmt.Sprintf("%d", id)),
	)
	data, err := thunk()
	if err != nil {
		return nil, err
	}

	u, ok := data.(model.User)
	if !ok {
		return nil, ErrLoaderResultTyping
	}
	return &u, nil
}

// lazy loadの関数
func batchLoadUser(
	ctx context.Context,
	keys dataloader.Keys,
) []*dataloader.Result {
	ids := extractIDsFromKeys(keys)

	as := &model.Users{}
	err := as.List(ids)

	rs := make([]*dataloader.Result, len(*as))

	for i := range *as {
		rs[i] = &dataloader.Result{Data: (*as)[i], Error: err}
	}

	return rs
}
