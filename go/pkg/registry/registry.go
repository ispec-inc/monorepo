package registry

type Registry struct {
	lgr   Logger
	msgbs MessageBus
}

func New(
	l Logger,
	m MessageBus,
) Registry {
	return Registry{
		lgr:   l,
		msgbs: m,
	}
}

func (r Registry) Logger() Logger {
	return r.lgr
}

func (r Registry) MessageBus() MessageBus {
	return r.msgbs
}
