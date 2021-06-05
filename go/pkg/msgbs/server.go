package msgbs

import "context"

type SubscribeServer []Subscriber

func NewSubscribeServer() SubscribeServer {
	return SubscribeServer{}
}

func (r SubscribeServer) Serve(ctx context.Context) {
	for _, subsc := range r {
		subsc.Do(ctx)
	}
}

func (s SubscribeServer) Mount(subsc Subscriber) {
	s = append(s, subsc)
}

func (s SubscribeServer) Shutdown() {
	for _, subsc := range s {
		for evnt := range subsc.Router {
			subsc.MessageBus.Unsubscribe(evnt)
		}
	}
}
