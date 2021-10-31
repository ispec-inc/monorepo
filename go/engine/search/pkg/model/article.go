package model

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/ispec-inc/monorepo/go/engine/search/pkg/elasticsearch"
	"github.com/ispec-inc/monorepo/go/engine/search/pkg/entity"
	"github.com/ispec-inc/monorepo/go/pkg/apperror"
	elastic "github.com/olivere/elastic/v7"
)

type (
	Article struct {
		entity.Article
	}
	ArticleList []Article
)

func (as ArticleList) Search(
	ctx context.Context,
	query string,
	offset int,
	limit int,
) error {

	res, err := elasticsearch.Get().Search().
		Index(entity.ArticleIndexName).
		Query(elastic.NewTermQuery("body", query)).
		From(offset).
		Size(limit).
		Do(ctx)
	if err != nil {
		return err
	}

	as = make(ArticleList, len(res.Hits.Hits))

	for i, hit := range res.Hits.Hits {
		var a Article
		if err := json.Unmarshal(hit.Source, &a); err != nil {
			return apperror.WithCode(apperror.CodeError, err)
		}
		as[i] = a
	}

	return nil
}

func (a Article) Insert(ctx context.Context) error {
	_, err := elasticsearch.Get().
		Index().
		Index(entity.ArticleIndexName).
		Id(fmt.Sprintf("%d", a.ID)).
		BodyJson(&a).
		Do(ctx)

	if err != nil {
		return apperror.WithCode(apperror.CodeError, err)
	}

	return nil
}

func (as ArticleList) BuklInsert(ctx context.Context) error {

	docs := make([]elastic.BulkableRequest, len(as))

	for i := range as {
		doc := elastic.NewBulkIndexRequest().
			Index(entity.ArticleIndexName).
			Id(strconv.FormatInt(as[i].ID, 10)).
			Doc(as[i])
		docs[i] = doc
	}

	_, err := elasticsearch.Get().
		Bulk().
		Add(docs...).
		Refresh("true").
		Do(ctx)

	if err != nil {
		return apperror.WithCode(apperror.CodeError, err)
	}

	return nil
}
