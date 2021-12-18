package call

import (
	"context"
	"strconv"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/call"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/resolver"
	uc "github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/uc/call"
)

type CallArgs struct {
	ID graphql.ID
}

func (a Adapter) Call(ctx context.Context, args CallArgs) (resolver.Call, error) {
	id, err := strconv.Atoi(string(args.ID))
	if err != nil {
		return resolver.Call{}, err
	}

	get := uc.NewGetUseCase(a.registry)
	ipt := uc.GetInput{
		CallID: call.ID(id),
	}
	opt, err := get.Do(ipt)
	if err != nil {
		return resolver.Call{}, err
	}

	rslv := resolver.NewCall(opt.Call)
	return *rslv, nil
}
