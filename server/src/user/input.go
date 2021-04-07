package user

type GetInput struct {
	ID int64
}

type CreateInput struct {
	Name        string
	Description string
	Email       string
}
