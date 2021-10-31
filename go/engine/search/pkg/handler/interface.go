package handler

type CreateInput struct {
	ArticleList []articleElementInput
}

type articleElementInput struct {
	ArticleID int64
	Title     string
	Body      string
}

type SearchInput struct {
	Query  string
	Offset int
	Limit  int
}

type SearchOutput struct {
	ArticleIDList []int64
}

type Hnadler interface {
	Create(CreateInput) error
	Search(SearchInput) (SearchOutput, error)
}
