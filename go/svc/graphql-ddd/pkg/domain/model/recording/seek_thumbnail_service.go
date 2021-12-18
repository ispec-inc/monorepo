package recording

type SeekThumbnailService interface {
	Get(recordingID ID, time RecordingTime) (RecordingSeekThumbnail, error)
}
