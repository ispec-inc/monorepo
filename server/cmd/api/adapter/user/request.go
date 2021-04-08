package user

type createRequest struct {
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
	Email       string `json:"email" validate:"required"`
}
