package config

import "github.com/caarlos0/env/v6"

func init() {
	if err := env.Parse(&AWSSearch); err != nil {
		panic(err)
	}
}

var AWSSearch awsSearch

type awsSearch struct {
	AccessKeyID     string `env:"MATCHING_AWS_ACCESS_KEY_ID"`
	SecretAccessKey string `env:"MATCHING_AWS_SECRET_ACCESS_KEY"`
	DefaultRegion   string `env:"MATCHING_AWS_DEFAULT_REGION"`
}
