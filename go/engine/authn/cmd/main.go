package main

import (
	"context"
	"fmt"
	"log"

	"github.com/ispec-inc/monorepo/go/engine/authn"
	"github.com/ispec-inc/monorepo/go/engine/authn/pkg/database"
)

func main() {
	if err := database.Init(nil); err != nil {
		log.Fatal(err)
	}
	auth, err := authn.NewAuthN(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	userID, err := auth.Login(context.Background(), "testToken")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(userID)
}
