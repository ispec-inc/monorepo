package invitation

import (
	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
	"testing"

	gomock "github.com/golang/mock/gomock"
	"github.com/joho/godotenv"
	"github.com/stretchr/testify/assert"

	"github.com/ispec-inc/go-distributed-monolith/pkg/domain/mock"
)

func Test(t *testing.T) {
	godotenv.Load()

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mock := mock.NewMockInvitation(ctrl)
	mock.EXPECT().Find(int64(1)).Return(
		model.Invitation{ID: int64(1), Code: "invitation-code"},
		nil,
	)

	// usecase := registry.NewInvitationUsecaseMock(ctrl) invitaion <-> regsitry 間で循環参照が発生するため，やめた
	usecase := Usecase{mock}

	test := NewTest(t, usecase)
	test.FindCodeSuccess()
}

type test struct {
	t *testing.T
	u Usecase
}

func NewTest(t *testing.T, u Usecase) test {
	t.Helper()
	return test{t, u}
}

func (t test) FindCodeSuccess() {
	output, err := t.u.FindCode(Input{ID: int64(1)})
	if err != nil {
		t.t.Errorf(
			"Error: code: %d, message: %s",
			err.Status(), err.Message(),
		)
	}
	assert.IsType(t.t, Output{}, output)
	assert.Exactly(t.t, int64(1), output.ID)
	assert.Exactly(t.t, "invitation-code", output.Code)
}
