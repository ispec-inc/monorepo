package main

import (
	"net/http"
)

func main() {
	r := SetRouter()
	http.ListenAndServe(":9000", r)
}
