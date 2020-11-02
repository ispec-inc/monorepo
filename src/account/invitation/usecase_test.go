package invitation

import (
	"testing"

	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"

	gomock "github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"

	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/mock"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
)

func TestInvitationUsecase_FindCode(t *testing.T) {
	cases := map[string]struct {
		inp     FindCodeInput
		out     FindCodeOutput
		errCode apperror.Code
	}{
		"success": {
			inp: FindCodeInput{
				ID: int64(1),
			},
			out: FindCodeOutput{
				ID:     int64(1),
				UserID: int64(1),
				Code:   "code",
			},
			errCode: apperror.CodeNoError,
		},
		"not found": {
			inp: FindCodeInput{
				ID: int64(1),
			},
			out:     FindCodeOutput{},
			errCode: apperror.CodeNotFound,
		},
	}

	for name, c := range cases {
		t.Run(name, func(t *testing.T) {
			t.Parallel()

			ctrl := gomock.NewController(t)
			im := mock.NewMockInvitation(ctrl)

			aerr := apperror.NewTestError(c.errCode)
			im.EXPECT().Find(c.inp.ID).Return(model.Invitation(c.out), aerr)

			u := Usecase{invitationRepo: im}
			out, aerr := u.FindCode(c.inp)

			assert.Equal(t, c.out, out)
			apperror.AssertError(t, c.errCode, aerr)

			ctrl.Finish()
		})
	}
}

func TestInvitationUsecase_AddCode_Success(t *testing.T) {
	cases := map[string]struct {
		inp     AddCodeInput
		out     AddCodeOutput
		errCode apperror.Code
	}{
		"success": {
			inp: AddCodeInput{
				UserID: int64(1),
				Code:   "code",
			},
			out: AddCodeOutput{
				ID:     int64(1),
				UserID: int64(1),
				Code:   "code",
			},
			errCode: apperror.CodeNoError,
		},
		"internal error": {
			inp: AddCodeInput{
				UserID: int64(1),
				Code:   "code",
			},
			out:     AddCodeOutput{},
			errCode: apperror.CodeError,
		},
	}

	for name, c := range cases {
		t.Run(name, func(t *testing.T) {
			t.Parallel()

			ctrl := gomock.NewController(t)
			im := mock.NewMockInvitation(ctrl)

			aerr := apperror.NewTestError(c.errCode)
			inv := model.Invitation{
				UserID: c.inp.UserID,
				Code:   c.inp.Code,
			}
			im.EXPECT().Create(inv).Return(aerr)

			u := Usecase{invitationRepo: im}
			out, aerr := u.AddCode(c.inp)

			assert.Equal(t, c.out, out)
			apperror.AssertError(t, c.errCode, aerr)

			ctrl.Finish()
		})
	}
}
