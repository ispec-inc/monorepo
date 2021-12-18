package recording

import (
	"errors"
)

var (
	ErrSeekThumbnailAlreadySigned = errors.New("recording seek thumbnail: already signed")
)

type RecordingSeekThumbnail struct {
	RecordingID ID
	Time        RecordingTime
	RawURL      string
	SignedURL   *ImageURL
}

func (r RecordingSeekThumbnail) IsSigned() bool {
	return r.SignedURL != nil
}

func (r *RecordingSeekThumbnail) Sign(url ImageURL) error {
	if r.IsSigned() {
		return ErrSeekThumbnailAlreadySigned
	}

	r.SignedURL = &url

	return nil
}
