package user

import (
	"testing"

	"github.com/ispec-inc/monorepo/server/pkg/apperror"
	"github.com/ispec-inc/monorepo/server/pkg/applog"

	gomock "github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"

	"github.com/ispec-inc/monorepo/server/pkg/domain/model"
	mock_repository "github.com/ispec-inc/monorepo/server/pkg/domain/repository/mock"
	mockio_repository "github.com/ispec-inc/monorepo/server/pkg/domain/repository/mockio"
)

func TestUserUsecase_FindCode(t *testing.T) {
	cases := []struct {
		name    string
		in      *FindCodeInput
		want    *FindCodeOutput
		invFind mockio_repository.UserFind
		err     bool
	}{
		{
			name: "Created",
			in: &FindCodeInput{
				ID: int64(1),
			},
			want: &FindCodeOutput{
				User: model.User{
					ID:     int64(1),
					UserID: int64(1),
					Code:   "code",
				},
			},
			invFind: mockio_repository.UserFind{
				Time:  1,
				ArgId: int64(1),
				Ret0: model.User{
					ID:     int64(1),
					UserID: int64(1),
					Code:   "code",
				},
				Ret1: nil,
			},
			err: false,
		},
		{
			name: "NotFound",
			in: &FindCodeInput{
				ID: int64(1),
			},
			want: nil,
			invFind: mockio_repository.UserFind{
				Time:  1,
				ArgId: int64(1),
				Ret0: model.User{
					ID:     int64(1),
					UserID: int64(1),
					Code:   "code",
				},
				Ret1: apperror.New(apperror.CodeNotFound, ""),
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

			invRepo := mock_repository.NewMockUser(ctrl)
			invRepo.EXPECT().
				Find(tc.invFind.ArgId).
				Return(tc.invFind.Ret0, tc.invFind.Ret1).
				Times(tc.invFind.Time)

			lg := applog.New(nil)
			ctx := lg.TestContext()

			u := Usecase{
				user: invRepo,
				log:  lg,
			}
			got, aerr := u.FindCode(ctx, tc.in)

			assert.Exactly(t, tc.want, got)
			if tc.err {
				assert.Error(t, aerr)
			} else {
				assert.NoError(t, aerr)
			}
		})
	}
}

func TestUserUsecase_AddCode_Success(t *testing.T) {
	cases := []struct {
		name            string
		in              *AddCodeInput
		want            *AddCodeOutput
		invCreate       mockio_repository.UserCreate
		invFindByUserID mockio_repository.UserFindByUserID
		err             bool
	}{
		{
			name: "Created",
			in: &AddCodeInput{
				User: model.User{
					UserID: int64(1),
					Code:   "code",
				},
			},
			want: &AddCodeOutput{
				User: model.User{
					ID:     int64(1),
					UserID: int64(1),
					Code:   "code",
				},
			},
			invCreate: mockio_repository.UserCreate{
				Time: 1,
				ArgMinv: model.User{
					UserID: int64(1),
					Code:   "code",
				},
				Ret0: nil,
			},
			invFindByUserID: mockio_repository.UserFindByUserID{
				Time:   1,
				ArgUid: int64(1),
				Ret0: model.User{
					ID:     int64(1),
					UserID: int64(1),
					Code:   "code",
				},
				Ret1: nil,
			},
			err: false,
		},
		{
			name: "InternalError",
			in: &AddCodeInput{
				User: model.User{
					UserID: int64(1),
					Code:   "code",
				},
			},
			want: nil,
			invCreate: mockio_repository.UserCreate{
				Time: 1,
				ArgMinv: model.User{
					UserID: int64(1),
					Code:   "code",
				},
				Ret0: apperror.New(apperror.CodeError, ""),
			},
			invFindByUserID: mockio_repository.UserFindByUserID{
				Time: 0,
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

			invRepo := mock_repository.NewMockUser(ctrl)
			invRepo.EXPECT().
				Create(tc.invCreate.ArgMinv).
				Return(tc.invCreate.Ret0).
				Times(tc.invCreate.Time)
			invRepo.EXPECT().
				FindByUserID(tc.invFindByUserID.ArgUid).
				Return(tc.invFindByUserID.Ret0, tc.invFindByUserID.Ret1).
				Times(tc.invFindByUserID.Time)

			lg := applog.New(nil)
			ctx := lg.TestContext()

			u := Usecase{
				user: invRepo,
				log:  lg,
			}
			got, aerr := u.AddCode(ctx, tc.in)

			assert.Exactly(t, tc.want, got)
			if tc.err {
				assert.Error(t, aerr)
			} else {
				assert.NoError(t, aerr)
			}
		})
	}
}
