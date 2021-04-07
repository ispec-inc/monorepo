package invitation

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

func TestInvitationUsecase_FindCode(t *testing.T) {
	cases := []struct {
		name    string
		in      *FindCodeInput
		want    *FindCodeOutput
		invFind mockio_repository.InvitationFind
		err     bool
	}{
		{
			name: "Created",
			in: &FindCodeInput{
				ID: int64(1),
			},
			want: &FindCodeOutput{
				Invitation: model.Invitation{
					ID:     int64(1),
					UserID: int64(1),
					Code:   "code",
				},
			},
			invFind: mockio_repository.InvitationFind{
				Time:  1,
				ArgId: int64(1),
				Ret0: model.Invitation{
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
			invFind: mockio_repository.InvitationFind{
				Time:  1,
				ArgId: int64(1),
				Ret0: model.Invitation{
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

			invRepo := mock_repository.NewMockInvitation(ctrl)
			invRepo.EXPECT().
				Find(tc.invFind.ArgId).
				Return(tc.invFind.Ret0, tc.invFind.Ret1).
				Times(tc.invFind.Time)

			lg := applog.New(nil)
			ctx := lg.TestContext()

			u := Usecase{
				invitation: invRepo,
				log:        lg,
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

func TestInvitationUsecase_AddCode_Success(t *testing.T) {
	cases := []struct {
		name            string
		in              *AddCodeInput
		want            *AddCodeOutput
		invCreate       mockio_repository.InvitationCreate
		invFindByUserID mockio_repository.InvitationFindByUserID
		err             bool
	}{
		{
			name: "Created",
			in: &AddCodeInput{
				Invitation: model.Invitation{
					UserID: int64(1),
					Code:   "code",
				},
			},
			want: &AddCodeOutput{
				Invitation: model.Invitation{
					ID:     int64(1),
					UserID: int64(1),
					Code:   "code",
				},
			},
			invCreate: mockio_repository.InvitationCreate{
				Time: 1,
				ArgMinv: model.Invitation{
					UserID: int64(1),
					Code:   "code",
				},
				Ret0: nil,
			},
			invFindByUserID: mockio_repository.InvitationFindByUserID{
				Time:   1,
				ArgUid: int64(1),
				Ret0: model.Invitation{
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
				Invitation: model.Invitation{
					UserID: int64(1),
					Code:   "code",
				},
			},
			want: nil,
			invCreate: mockio_repository.InvitationCreate{
				Time: 1,
				ArgMinv: model.Invitation{
					UserID: int64(1),
					Code:   "code",
				},
				Ret0: apperror.New(apperror.CodeError, ""),
			},
			invFindByUserID: mockio_repository.InvitationFindByUserID{
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

			invRepo := mock_repository.NewMockInvitation(ctrl)
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
				invitation: invRepo,
				log:        lg,
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
