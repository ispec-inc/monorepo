package invitation

import (
	"testing"

	gomock "github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"

	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/mock"
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
)

func TestInvitationUsecase_FindCode_Success(t *testing.T) {
	t.Helper()

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	id := int64(1)
	userID := int64(1)
	code := "code"

	im := mock.NewMockInvitation(ctrl)
	im.EXPECT().Find(
		id,
	).Return(
		model.Invitation{
			ID:     id,
			UserID: userID,
			Code:   code,
		},
		nil,
	)

	u := Usecase{invitationRepo: im}

	output, aerr := u.FindCode(FindCodeInput{ID: id})
	assert.Exactly(t, nil, aerr)
	assert.Exactly(t, id, output.ID)
}

func TestInvitationUsecase_AddCode_Success(t *testing.T) {
	t.Helper()

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	id := int64(1)
	userID := int64(1)
	code := "code"

	im := mock.NewMockInvitation(ctrl)
	im.EXPECT().Create(
		model.Invitation{
			UserID: userID,
			Code:   code,
		},
	).Return(
		model.Invitation{
			ID:     id,
			UserID: userID,
			Code:   code,
		},
		nil,
	)

	u := Usecase{invitationRepo: im}

	output, aerr := u.AddCode(
		AddCodeInput{
			UserID: userID,
			Code:   code,
		},
	)
	assert.Exactly(t, nil, aerr)
	assert.Exactly(t, id, output.ID)
}
