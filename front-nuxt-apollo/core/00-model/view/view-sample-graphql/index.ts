import { ArticlesResponse } from '~/types/response/articles'
import { ArticleModel, IArticleModel } from '~/core/00-model/other/article'
import { ArticleContent } from '~/types/article-content'

export interface IViewSampleGraphqlModel {
  articles: ArticleModel[]
  contents: ArticleContent[]
  rawData: ArticlesResponse
}

export class ViewSampleGraphqlModel implements IViewSampleGraphqlModel {
  readonly articles: IArticleModel[]

  constructor(data: ArticlesResponse) {
    this.articles = data.articles.map((value) => {
      return new ArticleModel(value)
    })
  }

  get contents(): ArticleContent[] {
    return this.articles.map((value) => {
      return value.titleBody
    })
  }

  get rawData(): ArticlesResponse {
    return {
      articles: this.articles.map((value) => {
        return value.rawData
      })
    }
  }
}
