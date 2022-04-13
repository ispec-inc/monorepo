package article

import "errors"

var (
	ErrTitleIsEmpty           = errors.New("article title is empty")
	ErrContentIsEmpty         = errors.New("article content is empty")
	ErrNoViewArticlePrivilege = errors.New("no view article privilege")
)
