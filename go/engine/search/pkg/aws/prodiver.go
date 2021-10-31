package aws

import (
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/ispec-inc/monorepo/go/engine/search/pkg/config"
)

type provider struct {
}

func (p provider) IsExpired() bool {
	return false
}

func (p provider) Retrieve() (credentials.Value, error) {
	v := credentials.Value{
		AccessKeyID:     config.AWSSearch.AccessKeyID,
		SecretAccessKey: config.AWSSearch.SecretAccessKey,
	}
	return v, nil
}
