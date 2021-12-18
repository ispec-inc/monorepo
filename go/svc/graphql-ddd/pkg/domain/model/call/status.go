package call

type CallStatus int

const (
	CallStatusStarted CallStatus = iota + 1
	CallStatusSaved
	CallStatusDeleted
)
