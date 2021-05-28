package config

import (
	"github.com/caarlos0/env/v6"
)

func init() {
	if err := env.Parse(&AWS); err != nil {
		panic(err)
	}
}

var AWS aws

type aws struct {
	AccessKey           string `env:"AWS_ACCESS_KEY"`
	SecretKey           string `env:"AWS_SECRET_KEY"`
	S3MediaBucketName   string `env:"AWS_S3_MEDIA_BUCKET_NAME"`
	S3MediaBucketRegion string `env:"AWS_S3_MEDIA_BUCKET_REGION"`
}
