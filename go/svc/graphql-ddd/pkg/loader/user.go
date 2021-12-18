package loader

import (
	"context"
	"fmt"
	"strconv"

	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"

	"github.com/graph-gophers/dataloader"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/query"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/registry"
)

type UserResult struct {
	User  user.User
	Error error
}

func LoadUsers(
	ctx context.Context,
	ids []user.ID,
) ([]UserResult, error) {

	ldr, err := getLoader(ctx, userKey)
	if err != nil {
		return nil, err
	}

	thunk := ldr.LoadMany(
		ctx,
		newKeysFromUserIDList(ids),
	)
	data, errs := thunk()

	results := make([]UserResult, len(data))
	for i, d := range data {
		var e error
		if errs != nil {
			e = errs[i]
		}

		a, ok := d.(user.User)
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
	id user.ID,
) (*user.User, error) {
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

	u, ok := data.(user.User)
	if !ok {
		return nil, ErrLoaderResultTyping
	}
	return &u, nil
}

type UserBatchedLoader struct {
	q query.User
}

func NewUserBatchedLoader(
	registry registry.Repository,
) BatchedLoader {
	return UserBatchedLoader{
		q: registry.NewUserQuery(),
	}
}

func (u UserBatchedLoader) Load(
	ctx context.Context,
	keys dataloader.Keys,
) []*dataloader.Result {
	ids := make([]user.ID, len(keys))
	for i := range keys {
		id, err := strconv.Atoi(keys[i].String())
		if err == nil {
			ids[i] = user.ID(int64(id))
		}
	}

	us, err := u.q.List(ids)
	umap := us.ToMap()

	rs := make([]*dataloader.Result, len(ids))

	for i, id := range ids {
		rs[i] = &dataloader.Result{Data: umap[id], Error: err}
	}

	return rs
}

func newKeysFromUserIDList(ids []user.ID) dataloader.Keys {
	keys := make([]string, len(ids))

	for i := range ids {
		keys[i] = fmt.Sprintf("%d", ids[i])
	}
	return dataloader.NewKeysFromStrings(keys)
}
