package service

import "github.com/ispec-inc/monorepo/go/svc/graphql-ddd/pkg/domain/model/recording"

type LocalStorage struct {
}

func NewLocalStorage() LocalStorage {
	return LocalStorage{}
}

func (l LocalStorage) GetSignedURL(r recording.RawURL) (*recording.SignedURL, error) {
	return &recording.SignedURL{
		URL:           recording.RecordingURL(r.URL),
		ThumbnailURL:  recording.ImageURL(r.ThumbnailURL),
		TranscriptURL: recording.TranscriptURL(r.TranscriptURL),
	}, nil
}

func (l LocalStorage) GetSignedSeekThumbnailURL(url string) (*recording.ImageURL, error) {
	signed := recording.ImageURL(url)
	return &signed, nil
}
