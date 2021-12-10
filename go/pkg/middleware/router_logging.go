package middleware

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/go-chi/chi/middleware"
	"github.com/google/uuid"
)

const logType = "request"

func RequestLogger(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		ww := middleware.NewWrapResponseWriter(w, r.ProtoMajor)

		reqID := r.Header.Get("x-request-id")
		if reqID == "" {
			reqID = uuid.New().String()
		}

		ww.Header().Set("request-id", reqID)
		defer func() {
			logRequestInfo(ww, r, time.Now(), reqID)
		}()

		next.ServeHTTP(ww, r)
	}
	return http.HandlerFunc(fn)
}

func logRequestInfo(
	ww middleware.WrapResponseWriter,
	r *http.Request,
	timeFrom time.Time,
	requestID string,
) {
	scheme := "http"
	if r.TLS != nil {
		scheme = "https"
	}
	info := requestInfo{
		Type:      logType,
		Timestamp: time.Now().String(),
		Method:    r.Method,
		Host:      fmt.Sprintf("%s://%s%s", scheme, r.Host, r.RequestURI),
		Protocol:  r.Proto,
		From:      r.RemoteAddr,
		Status:    ww.Status(),
		Bytes:     ww.BytesWritten(),
		Elapsed:   time.Since(timeFrom).String(),
		RequestID: requestID,
	}
	fmt.Println(info.JSONString())
}

type requestInfo struct {
	Type      string `json:"type"`
	Timestamp string `json:"timestamp"`
	Method    string `json:"method"`
	Host      string `json:"host"`
	Protocol  string `json:"protocol"`
	From      string `json:"from"`
	Status    int    `json:"status"`
	Bytes     int    `json:"bytes(B)"`
	Elapsed   string `json:"elapsed"`
	RequestID string `json:"request_id"`
}

func (i requestInfo) JSONString() string {
	bytes, _ := json.Marshal(&i)
	return string(bytes)
}
