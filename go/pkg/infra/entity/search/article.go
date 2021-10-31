package search

var (
	ArticleIndexName    = "article"
	ArticleIndexSetting = map[string]interface{}{
		"settings": map[string]interface{}{
			"number_of_shards":   2,
			"number_of_replicas": 0,
		},
	}
	ArticleIndexMapping = map[string]interface{}{
		"properties": map[string]interface{}{
			"id": map[string]interface{}{
				"type": "long",
			},
			"title": map[string]interface{}{
				"type": "keyword",
			},
			"body": map[string]interface{}{
				"type": "keyword",
			},
		},
	}
)

type (
	Article struct {
		ID    int64  `json:"id"`
		Title string `json:"title"`
		Body  string `json:"body"`
	}
)
