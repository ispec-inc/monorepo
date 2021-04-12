package user

import (
	"errors"
	"testing"

	"github.com/ispec-inc/monorepo/server/pkg/applog"

	gomock "github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"

	"github.com/ispec-inc/monorepo/server/pkg/domain/model"
	mock_repository "github.com/ispec-inc/monorepo/server/pkg/domain/repository/mock"
)

func TestUserUsecase_Get(t *testing.T) {
	cases := []struct {
		name     string
		give     *GetInput
		want     *GetOutput
		userRepo func(*gomock.Controller) *mock_repository.MockUser
		err      bool
	}{
		{
			name: "success",
			give: &GetInput{
				ID: int64(1),
			},
			want: &GetOutput{
				User: &model.User{ID: int64(1)},
			},
			userRepo: func(c *gomock.Controller) *mock_repository.MockUser {
				u := mock_repository.NewMockUser(c)
				u.EXPECT().Get(int64(1)).Return(&model.User{ID: int64(1)}, nil).Times(1)
				return u
			},
		},
		{
			name: "fail to get user",
			give: &GetInput{ID: int64(1)},
			userRepo: func(c *gomock.Controller) *mock_repository.MockUser {
				u := mock_repository.NewMockUser(c)
				u.EXPECT().Get(int64(1)).Return(nil, errors.New("unknown")).Times(1)
				return u
			},
			err: true,
		},
	}

	for i := range cases {
		tc := cases[i]
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()

			c := gomock.NewController(t)
			defer c.Finish()

			lg := applog.New(nil)
			u := Usecase{
				user: tc.userRepo(c),
				log:  lg,
			}
			got, aerr := u.Get(lg.TestContext(), tc.give)

			if tc.err {
				assert.Error(t, aerr)
			} else {
				assert.NoError(t, aerr)
				assert.Exactly(t, tc.want, got)
			}
		})
	}
}

func TestUserUsecase_Create(t *testing.T) {
	cases := []struct {
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

	for i := range cases {
		tc := cases[i]
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()

			c := gomock.NewController(t)
			defer c.Finish()

			lg := applog.New(nil)
			u := Usecase{
				user: tc.userRepo(c),
				log:  lg,
			}
			got, aerr := u.Create(lg.TestContext(), tc.give)

			if tc.err {
				assert.Error(t, aerr)
			} else {
				assert.NoError(t, aerr)
				assert.Exactly(t, tc.want, got)
			}
		})
	}
}
