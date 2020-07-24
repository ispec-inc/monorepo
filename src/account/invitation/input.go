package invitation

type FindCodeInput struct {
	ID int64
}

type AddCodeInput struct {
	UserID int64
	Code   string
}
