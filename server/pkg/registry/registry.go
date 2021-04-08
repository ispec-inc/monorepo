package registry

type Registry struct {
	repo Repository
	lgr  Logger
}

func NewRegistry(r Repository, l Logger) Registry {
	return Registry{
		repo: r,
		lgr:  l,
	}
}

func (r Registry) Repository() Repository {
	return r.repo
}

func (r Registry) Logger() Logger {
	return r.lgr
}
