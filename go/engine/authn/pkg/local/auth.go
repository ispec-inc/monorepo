package local

import (
	"context"
	"errors"

	"github.com/ispec-inc/monorepo/go/engine/authn/config"
	"github.com/ispec-inc/monorepo/go/engine/authn/pkg/model"
)

const (
	token = "testToken"
)

type auth struct{}

func NewAuth() auth {
	return auth{}
}

func (a auth) Login(ctx context.Context, idToken string) (accountID string, err error) {
	if idToken != token {
		return "", errors.New("login failed")
	}

	dummyID := config.AuthN.DummyID

	return dummyID, nil
}

func (a auth) GetEmail(ctx context.Context, userID int64) (email string, err error) {
	return config.AuthN.DummyEmail, nil
}

func (a auth) SignUp(ctx context.Context, email string, userID int64) (err error) {
	fa := &model.FirebaseAccount{}
	if err = fa.FindByFirebaseServiceID(config.AuthN.DummyID); err != nil {
		return err
	}

	if fa.ID == 0 {
		m := model.NewFirebaseAccount(userID, config.AuthN.DummyID)
		if err := m.Create(); err != nil {
			return err
		}
	}
	return nil
}
