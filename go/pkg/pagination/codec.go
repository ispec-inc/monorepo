package pagination

import (
	"encoding/base64"
	"fmt"
	"strconv"
	"strings"

	"github.com/graph-gophers/graphql-go"
)

const prefix = "cursor"

func EncodeCursor(id int64) graphql.ID {
	return graphql.ID(base64.StdEncoding.EncodeToString([]byte(fmt.Sprintf("%v%v", prefix, id))))
}

func DecodeCursor(cursor string) (int64, error) {
	b, err := base64.StdEncoding.DecodeString(cursor)
	if err != nil {
		return 0, err
	}

	str := strings.TrimPrefix(string(b), prefix)
	id, err := strconv.Atoi(str)
	if err != nil {
		return 0, err
	}

	return int64(id), nil
}
