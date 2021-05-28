package aws

type S3UploadInput struct {
	Bucket string
	Region string
	Path   string
	File   string
	ACL    acl
}
