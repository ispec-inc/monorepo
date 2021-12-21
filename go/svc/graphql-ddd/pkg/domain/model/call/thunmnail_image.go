package call

import "net/url"

type ImageURL string

func (i ImageURL) IsValid() bool {
	_, err := url.ParseRequestURI(string(i))
	return err != nil
}
