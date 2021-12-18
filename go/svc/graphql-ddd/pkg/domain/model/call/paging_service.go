package call

import "github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/user"

type PaginationService interface {
	ListByParticipantID(user.ID, PaginationArgs) (*PaginationOutput, error)
	ListByTeamUserID(user.ID, PaginationArgs) (*PaginationOutput, error)
}

type PaginationArgs struct {
	First  *int32
	After  *string
	Last   *int32
	Before *string
}

type PaginationOutput struct {
	IDList     []ID
	FirstID    ID
	LastID     ID
	TotalCount int
}
