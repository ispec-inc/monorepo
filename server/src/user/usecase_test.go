package user

import (
	"errors"
	"testing"

	"github.com/ispec-inc/monorepo/server/pkg/applog"

	gomock "github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"

	"github.com/ispec-inc/monorepo/server/pkg/domain/model"
	mock_repository "github.com/ispec-inc/monorepo/server/pkg/domain/repository/mock"
	mockio_repository "github.com/ispec-inc/monorepo/server/pkg/domain/repository/mockio"
)

func TestUserUsecase_Get(t *testing.T) {
	cases := []struct {
		name    string
		give    *GetInput
		want    *GetOutput
		userGet mockio_repository.UserGet
		err     bool
	}{
		{
			name: "success",
			give: &GetInput{
				ID: int64(1),
			},
			want: &GetOutput{
				User: &model.User{ID: int64(1)},
			},
			userGet: mockio_repository.UserGet{
				Time:  1,
				ArgId: int64(1),
				Ret0:  &model.User{ID: int64(1)},
				Ret1:  nil,
			},
		},
		{
			name: "fail to get user",
			give: &GetInput{ID: int64(1)},
			userGet: mockio_repository.UserGet{
				Time:  1,
				ArgId: int64(1),
				Ret1:  errors.New("unknown"),
			},
			err: true,
		},
	}

	for i := range cases {
		tc := cases[i]
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			userRepo := mock_repository.NewMockUser(ctrl)
			userRepo.EXPECT().
				Get(tc.userGet.ArgId).
				Return(tc.userGet.Ret0, tc.userGet.Ret1).
				Times(tc.userGet.Time)

			lg := applog.New(nil)

			u := Usecase{
				user: userRepo,
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
		name       string
		give       *CreateInput
		want       *CreateOutput
		userCreate mockio_repository.UserCreate
		userList   mockio_repository.UserList
		err        bool
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
			userCreate: mockio_repository.UserCreate{
				Time:    1,
				ArgUser: &model.User{Name: "new"},
				Ret0:    nil,
			},
			userList: mockio_repository.UserList{
				Time:   1,
				ArgIds: nil,
				Ret0: []*model.User{
					{Name: "old"},
					{Name: "new"},
				},
				Ret1: nil,
			},
			err: false,
		},
		{
			name: "fail to create user",
			give: &CreateInput{Name: "new"},
			want: nil,
			userCreate: mockio_repository.UserCreate{
				Time:    1,
				ArgUser: &model.User{Name: "new"},
				Ret0:    errors.New("unknown"),
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
			userCreate: mockio_repository.UserCreate{
				Time:    1,
				ArgUser: &model.User{Name: "new"},
				Ret0:    nil,
			},
			userList: mockio_repository.UserList{
				Time:   1,
				ArgIds: nil,
				Ret0:   nil,
				Ret1:   errors.New("unknown"),
			},
			err: true,
		},
	}

	for i := range cases {
		tc := cases[i]
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()

			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			userRepo := mock_repository.NewMockUser(ctrl)
			userRepo.EXPECT().
				Create(tc.userCreate.ArgUser).
				Return(tc.userCreate.Ret0).
				Times(tc.userCreate.Time)
			userRepo.EXPECT().
				List(tc.userList.ArgIds).
				Return(tc.userList.Ret0, tc.userList.Ret1).
				Times(tc.userList.Time)

			lg := applog.New(nil)

			u := Usecase{
				user: userRepo,
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
