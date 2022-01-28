package subscription

import "github.com/ispec-inc/monorepo/go/svc/admin/pkg/redisbs"

var s Subscription

func Init() {
	bs := redisbs.Get()
	s = newSubscription(bs)
	go s.Listen()
}

func Get() Subscription {
	return s
}
