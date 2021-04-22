package view

import (
	pb "github.com/ispec-inc/monorepo/go/gen/admin/view"
	"github.com/ispec-inc/monorepo/go/svc/admin/pkg/model"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func NewArticle(m *model.Article) *pb.Article {
	return &pb.Article{
		Id:        m.ID,
		UserId:    m.UserID,
		Title:     m.Title,
		Body:      m.Body,
		CreatedAt: timestamppb.New(m.CreatedAt),
		UpdatedAt: timestamppb.New(m.UpdatedAt),
	}
}

func NewArticles(ms []*model.Article) []*pb.Article {
	vs := make([]*pb.Article, len(ms))
	for i, m := range ms {
		vs[i] = NewArticle(m)
	}
	return vs
}
