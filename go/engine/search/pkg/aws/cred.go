package aws

import "github.com/aws/aws-sdk-go/aws/credentials"

var creds *credentials.Credentials

func Init() {
	creds = credentials.NewCredentials(provider{})
}

func Get() *credentials.Credentials {
	return creds
}
