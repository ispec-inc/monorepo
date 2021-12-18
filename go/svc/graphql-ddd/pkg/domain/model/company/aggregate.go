package company

import "github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/value"

type Company struct {
	ID      value.ID
	IconURL IconURL
	Name    string
}
