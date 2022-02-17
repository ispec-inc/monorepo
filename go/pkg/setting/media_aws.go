package setting

type (
	MediaAWS struct {
		AccessKey      string `yaml:"access_key"`
		SecretKey      string `yaml:"secret_key"`
		S3BucketName   string `yaml:"s3_bucket_name"`
		S3BucketRegion string `yaml:"s3_bucket_region"`
	}
)
