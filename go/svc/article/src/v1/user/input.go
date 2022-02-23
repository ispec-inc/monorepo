package user

type GetInput struct {
	ID uint
}

type CreateInput struct {
	Name        string
	Description string
	Email       string
}
