package recording

import "fmt"

type RecordingTime struct {
	Hour    uint
	Min     uint
	Secound uint
}

func (r RecordingTime) String() string {
	return fmt.Sprintf("%d:%d:%d", r.Hour, r.Min, r.Secound)
}
