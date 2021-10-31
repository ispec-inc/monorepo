package handler

import "context"

type HandlerImpl struct {
}

func (h HandlerImpl) Search(ctx context.Context, ipt SearchInput) (opt SearchOutput, err error) {
	return opt, nil
}

func (h HandlerImpl) Create(ctx context.Context, ipt CreateInput) error {
	return nil
}
