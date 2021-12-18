package recording

import (
	"errors"
)

var (
	ErrAlreadySigned = errors.New("recording: already signed")
)

type (
	Recording struct {
		ID        ID
		Time      RecordingTime
		RawURL    RawURL
		SignedURL *SignedURL
	}

	ID int64

	RecordingList []Recording
)

func (rl RecordingList) ToMap() map[ID]Recording {
	data := make(map[ID]Recording)

	for _, r := range rl {
		data[r.ID] = r
	}

	return data
}

type RawURL struct {
	URL           string
	ThumbnailURL  string
	TranscriptURL string
}

type SignedURL struct {
	URL           RecordingURL
	ThumbnailURL  ImageURL
	TranscriptURL TranscriptURL
}

func Save(
	hour uint,
	min uint,
	secound uint,
	thumbnailImage string,
	url string,
	transcriptURL string,
) (Recording, error) {

	return Recording{
		RawURL: RawURL{
			URL:           url,
			ThumbnailURL:  thumbnailImage,
			TranscriptURL: transcriptURL,
		},
		Time: RecordingTime{
			Hour:    hour,
			Min:     min,
			Secound: secound,
		},
	}, nil
}

func (r *Recording) IsSigned() bool {
	return r.SignedURL != nil
}

func (r *Recording) Sign(s SignedURL) error {
	if r.SignedURL != nil {
		return ErrAlreadySigned
	}
	r.SignedURL = &s
	return nil
}
