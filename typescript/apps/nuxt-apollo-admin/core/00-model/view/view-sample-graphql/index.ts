import { ArticlesResponse } from '~/types/response/articles'
import { ArticleModel } from '~/core/00-model/other/article'
import { ArticleContent } from '~/types/article-content'

export interface IViewSampleGraphqlModel {
  contents: ArticleContent[]
}

export class ViewSampleGraphqlModel implements IViewSampleGraphqlModel {
  _articles: ArticleModel[]

  constructor(data: ArticlesResponse) {
    this._articles = data.article.map((value) => {
      return new ArticleModel(value)
    })
  }

  get contents(): ArticleContent[] {
    return this._articles.map((value) => {
      return value.titleBody
    })
  }
}
