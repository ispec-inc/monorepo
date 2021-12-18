package handler

import (
	"context"

	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/resolver"
	"github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/uc/company"
)

func (h Handler) Company(ctx context.Context) (*resolver.Company, error) {
	uc := company.NewGetByUserUseCase(h.registry)
	ipt := company.GetByUserInput{
		//FIXME User ID
		UserID: 1,
	}
	opt, err := uc.Do(ipt)
	if err != nil {
		return nil, err
	}

	r := resolver.NewCompany(opt.Company)

	return r, nil
}
