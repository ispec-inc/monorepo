package invitation

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func GetCodeHandler(w http.ResponseWriter, r *http.Request) {
	// ctx := r.Context()
	response := InvitationCodeResponse{"invitation-code-sample"}
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Fprint(w, string(jsonResponse))
}
