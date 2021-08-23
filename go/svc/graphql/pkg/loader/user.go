package loader

import (
	"context"
	"errors"
	"fmt"
	"strconv"

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

	keys := make([]string, len(ids))

	for i := range ids {
		keys[i] = fmt.Sprintf("%d", ids[i])
	}
	loader := dataloader.NewBatchedLoader(batchLoadUser)
	thunk := loader.LoadMany(
		context.TODO(),
		dataloader.NewKeysFromStrings(keys),
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
			e = errors.New("typing error")
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

	us, ok := data.(*model.Users)
	if !ok && err == nil {
		err = errors.New("typing error")
		return nil, err
	}

	for _, u := range *us {
		if u.ID == id {
			return &u, nil
		}
	}
	return nil, nil
}

func batchLoadUser(
	ctx context.Context,
	keys dataloader.Keys,
) (rs []*dataloader.Result) {
	as := &model.Users{}
	ids := make([]int64, len(keys))

	for i := range keys {
		id, err := strconv.Atoi(keys[i].String())
		if err == nil {
			ids[i] = int64(id)
		}
	}
	err := as.List(ids)
	rs = append(rs, &dataloader.Result{Data: as, Error: err})

	return rs
}
