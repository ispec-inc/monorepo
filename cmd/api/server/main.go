package main

import (
	"net/http"
)

func main() {
	if err := mysql.SetDB(); err != nil {
		panic(err)
	}

	r := SetRouter()
	http.ListenAndServe(":9000", r)
}
