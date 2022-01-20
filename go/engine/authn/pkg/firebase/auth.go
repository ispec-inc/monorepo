package firebase

import (
	"context"
	"encoding/base64"
	"fmt"

	fb "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"github.com/ispec-inc/monorepo/go/engine/authn/config"
	"github.com/ispec-inc/monorepo/go/engine/authn/pkg/model"
	"github.com/ispec-inc/monorepo/go/pkg/apperror"
	"google.golang.org/api/option"
)

type firebase struct {
	client *auth.Client
}

func NewFirebase(ctx context.Context) (*firebase, error) {
	dec, err := base64.StdEncoding.DecodeString(config.AuthN.FirebaseAccessKey)
	if err != nil {
		return nil, err
	}

	opt := option.WithCredentialsJSON(dec)
	app, err := fb.NewApp(ctx, nil, opt)
	if err != nil {
		return nil, err
	}

	client, err := app.Auth(ctx)
	if err != nil {
		return nil, err
	}
	return &firebase{client: client}, nil
}

func (f firebase) Login(ctx context.Context, idToken string) (accountID string, err error) {
	token, err := f.client.VerifyIDTokenAndCheckRevoked(ctx, idToken)
	if err != nil {
		return "", apperror.New(
			apperror.CodeInvalid,
			fmt.Sprintf("error verifying ID token: %v", err),
		)
	}

	return token.UID, nil
}

func (f firebase) GetEmail(ctx context.Context, userID int64) (email string, err error) {
	fa := model.FirebaseAccount{}
	if err := fa.FindByUserID(userID); err != nil {
		return "", err
	}

	user, err := f.client.GetUser(ctx, fa.FirebaseAccountDetail.FirebaseServiceID)
	if err != nil {
		return "", nil
	}

	return user.Email, nil
}

func (f firebase) SignUp(ctx context.Context, email string, userID int64) (err error) {
	user, err := f.client.GetUserByEmail(ctx, email)
	if err != nil {
		return err
	}

	fa := &model.FirebaseAccount{}
	if err = fa.FindByFirebaseServiceID(user.UID); err != nil {
		return err
	}

	if fa.ID == 0 {
		m := model.NewFirebaseAccount(userID, user.UID)
		if err := m.Create(); err != nil {
			return err
		}
	}
	return nil
}
