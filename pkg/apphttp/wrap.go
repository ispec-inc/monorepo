package apphttp

import "net/http"

func Wrap(handler func(ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		aw := newResponseWriter(w)

		handler(aw, r)

		logError(aw, r)
	}
}
