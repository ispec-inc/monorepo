package main

import (
	"fmt"
	"net/http"

	"github.com/ispec-inc/monorepo/go/pkg/config"
)

func main() {
	port := fmt.Sprintf(":%d", config.Router.Port)
	http.ListenAndServe(port, NewRouter())
}
