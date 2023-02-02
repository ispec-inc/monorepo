package article

import "github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/registry"

type Adapter struct {
	registry registry.Registry
}

func New(r registry.Registry) Adapter {
	return Adapter{registry: r}
}
