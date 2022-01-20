package authn

import (
	"context"

	"github.com/ispec-inc/monorepo/go/engine/authn/config"
	"github.com/ispec-inc/monorepo/go/engine/authn/pkg/firebase"
	"github.com/ispec-inc/monorepo/go/engine/authn/pkg/local"
	"github.com/ispec-inc/monorepo/go/engine/authn/pkg/model"
	"github.com/ispec-inc/monorepo/go/engine/authn/pkg/repository"
)

type AuthN struct {
	authn repository.AuthN
}

func NewAuthN(ctx context.Context) (an AuthN, err error) {
	var (
		authn repository.AuthN
	)

	if config.AuthN.UseFirebase {
		authn, err = firebase.NewFirebase(ctx)
		if err != nil {
			return AuthN{}, err
		}
	} else {
		authn = local.NewAuth()
	}

	return AuthN{authn: authn}, nil
}

func (an AuthN) Login(ctx context.Context, idToken string) (userID int64, err error) {
	accountID, err := an.authn.Login(ctx, idToken)
	if err != nil {
		return 0, err
	}

	fa := model.FirebaseAccount{}
	if err := fa.FindByFirebaseServiceID(accountID); err != nil {
		return 0, err
	}

	userID = fa.FirebaseAccountUser.UserID

	return userID, nil
}

func (an AuthN) GetEmail(ctx context.Context, userID int64) (email string, err error) {
	email, err = an.authn.GetEmail(ctx, userID)
	if err != nil {
		return "", err
	}

	return email, nil
}

func (an AuthN) SignUp(ctx context.Context, email string, userID int64) (err error) {
	return an.authn.SignUp(ctx, email, userID)
}
