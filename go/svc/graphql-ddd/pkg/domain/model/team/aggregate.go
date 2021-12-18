package team

import "github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/value"

type Team struct {
	ID         value.ID
	Name       string
	UserIDList value.IDList
}

type TeamList []Team
