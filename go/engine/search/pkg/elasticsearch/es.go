package elasticsearch

import (
	"log"

	v4 "github.com/aws/aws-sdk-go/aws/signer/v4"
	"github.com/davecgh/go-spew/spew"
	"github.com/ispec-inc/monorepo/go/engine/search/pkg/aws"
	"github.com/ispec-inc/monorepo/go/engine/search/pkg/config"
	"github.com/olivere/elastic/v7"
	"github.com/sha1sum/aws_signing_client"
)

var es *elastic.Client

func Init() error {
	var err error

	if config.Elasticsearch.UseAWS {
		es, err = initAWS()
		if err != nil {
			return err
		}
	}

	es, err = elastic.NewClient(
		elastic.SetURL(config.Elasticsearch.URLs...),
		elastic.SetSniff(false),
	)
	return err
}

func initAWS() (*elastic.Client, error) {
	signer := v4.NewSigner(aws.Get())
	cl, err := aws_signing_client.New(
		signer,
		nil,
		"es",
		config.AWSSearch.DefaultRegion,
	)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	spew.Dump(config.Elasticsearch.URLs)
	es, err = elastic.NewClient(
		elastic.SetURL(config.Elasticsearch.URLs...),
		elastic.SetScheme("https"),
		elastic.SetHttpClient(cl),
		elastic.SetSniff(false),
	)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	return es, nil

}

func InitTest() error {
	var err error
	es, err = elastic.NewClient(
		elastic.SetURL(config.Elasticsearch.URLs...),
		elastic.SetSniff(false),
	)
	return err
}

func Get() *elastic.Client {
	return es
}
