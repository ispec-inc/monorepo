package user

import (
	"context"
	"errors"
	"testing"

	"github.com/ispec-inc/monorepo/go/pkg/applog"

	gomock "github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"

	"github.com/ispec-inc/monorepo/go/svc/article/pkg/domain/model"
	mock_repository "github.com/ispec-inc/monorepo/go/svc/article/pkg/domain/repository/mock"
)

func TestUserUsecase_Get(t *testing.T) {
	tests := []struct {
		name     string
		give     *GetInput
		want     *GetOutput
		userRepo func(*gomock.Controller) *mock_repository.MockUser
		err      bool
	}{
		{
			name: "success",
			give: &GetInput{
				ID: uint(1),
			},
			want: &GetOutput{
				User: &model.User{ID: uint(1)},
			},
			userRepo: func(c *gomock.Controller) *mock_repository.MockUser {
				u := mock_repository.NewMockUser(c)
				u.EXPECT().Get(uint(1)).Return(&model.User{ID: uint(1)}, nil).Times(1)
				return u
			},
		},
		{
			name: "fail to get user",
			give: &GetInput{ID: uint(1)},
			userRepo: func(c *gomock.Controller) *mock_repository.MockUser {
				u := mock_repository.NewMockUser(c)
				u.EXPECT().Get(uint(1)).Return(nil, errors.New("unknown")).Times(1)
				return u
			},
			err: true,
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			c := gomock.NewController(t)
			defer c.Finish()

			u := Usecase{
				user: tt.userRepo(c),
				log:  applog.New(nil),
			}
			got, aerr := u.Get(applog.WithTestContext(context.TODO()), tt.give)

			if tt.err {
				assert.Error(t, aerr)
			} else {
				assert.NoError(t, aerr)
				assert.Exactly(t, tt.want, got)
			}
		})
	}
}

func TestUserUsecase_Create(t *testing.T) {
	tests := []struct {
		name     string
		give     *CreateInput
		want     *CreateOutput
		userRepo func(*gomock.Controller) *mock_repository.MockUser
		err      bool
	}{
		{
			name: "success",
			give: &CreateInput{Name: "new"},
			want: &CreateOutput{
				Users: []*model.User{
					{Name: "old"},
					{Name: "new"},
				},
			},
			userRepo: func(c *gomock.Controller) *mock_repository.MockUser {
				u := mock_repository.NewMockUser(c)
				u.EXPECT().Create(&model.User{Name: "new"}).Return(nil)
				u.EXPECT().List(nil).Return([]*model.User{{Name: "old"}, {Name: "new"}}, nil)
				return u
			},
			err: false,
		},
		{
			name: "fail to create user",
			give: &CreateInput{Name: "new"},
			want: nil,
			userRepo: func(c *gomock.Controller) *mock_repository.MockUser {
				u := mock_repository.NewMockUser(c)
				u.EXPECT().Create(&model.User{Name: "new"}).Return(errors.New("unknown"))
				return u
			},
			err: true,
		},
		{
			name: "fail to list user",
			give: &CreateInput{Name: "new"},
			want: &CreateOutput{
				Users: []*model.User{
					{Name: "old"},
					{Name: "new"},
				},
			},
			userRepo: func(c *gomock.Controller) *mock_repository.MockUser {
				u := mock_repository.NewMockUser(c)
				u.EXPECT().Create(&model.User{Name: "new"}).Return(nil)
				u.EXPECT().List(nil).Return(nil, errors.New("unknown"))
				return u
			},
			err: true,
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			c := gomock.NewController(t)
			defer c.Finish()

			u := Usecase{
				user: tt.userRepo(c),
				log:  applog.New(nil),
			}
			got, aerr := u.Create(applog.WithTestContext(context.TODO()), tt.give)

			if tt.err {
				assert.Error(t, aerr)
			} else {
				assert.NoError(t, aerr)
				assert.Exactly(t, tt.want, got)
			}
		})
	}
}
