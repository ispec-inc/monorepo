package config

import (
	"github.com/caarlos0/env/v6"
)

func init() {
	if err := env.Parse(&AuthN); err != nil {
		panic(err)
	}
}

var AuthN authn

type authn struct {
	DummyID           string `env:"AUTHN_DUMMY_ID"`
	DummyEmail        string `env:"AUTHN_DUMMY_EMAIL"`
	UseFirebase       bool   `env:"AUTHN_USE_FIREBASE"`
	FirebaseAccessKey string `env:"AUTHN_FIREBASE_ACCESS_KEY"`
}
