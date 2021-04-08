package view

import (
	pb "github.com/ispec-inc/monorepo/proto/go/monorepopb/server/view"
	"github.com/ispec-inc/monorepo/server/pkg/domain/model"
)

func NewUser(m *model.User) *pb.User {
	return &pb.User{
		Id:          m.ID,
		Name:        m.Name,
		Description: m.Description,
		Email:       m.Email,
		CreatedAt:   TimeToProto(m.CreatedAt),
		UpdatedAt:   TimeToProto(m.UpdatedAt),
	}
}

func NewUsers(ms []*model.User) []*pb.User {
	vs := make([]*pb.User, len(ms))
	for i, m := range ms {
		vs[i] = NewUser(m)
	}
	return vs
}
