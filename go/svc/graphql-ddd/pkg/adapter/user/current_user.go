package user

import (
	"context"

	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/resolver"
	uc "github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/uc/user"
)

func (a Adapter) CurrentUser(ctx context.Context) (*resolver.User, error) {
	get := uc.NewGetUseCase(a.registry)
	ipt := uc.GetInput{
		//FIXME User ID
		UserID: 1,
	}
	opt, err := get.Do(ipt)
	if err != nil {
		return nil, err
	}

	r := resolver.NewUser(opt.User)

	return r, nil
}
