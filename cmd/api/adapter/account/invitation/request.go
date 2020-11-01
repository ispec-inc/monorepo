package invitation

type addCodeRequest struct {
	UserID int64  `json:"user_id" validate:"required"`
	Code   string `json:"code" validate:"required"`
}
