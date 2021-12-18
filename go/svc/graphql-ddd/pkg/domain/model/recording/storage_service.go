package recording

type StorageService interface {
	GetSignedURL(RawURL) (*SignedURL, error)
	GetSignedSeekThumbnailURL(string) (*ImageURL, error)
}
