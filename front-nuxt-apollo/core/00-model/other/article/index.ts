import { Article } from '~/types/model/article'
import { ArticleOption } from '~/types/article-option'
import { ArticleModelHelper } from '~/core/00-model/other/article/helper'
import { ArticleContent } from '~/types/article-content'
// import { IUserModel, UserModel } from '~/core/00-model/other/user'

export interface IArticleModel {
  id: string
  title: string
  body: string
  // writer: IUserModel
  articleOption: ArticleOption
  titleBody: ArticleContent
  rawData: Article
}

export class ArticleModel implements IArticleModel {
  readonly id: string
  readonly title: string
  readonly body: string
  // readonly _writer: IUserModel

  constructor(data: Article) {
    this.id = data.id
    this.title = data.title
    this.body = data.body
    // this.writer = new UserModel(data.writer)
  }

  get articleOption(): ArticleOption {
    return ArticleModelHelper.pairIdTitle(this.id, this.title)
  }

  get titleBody(): ArticleContent {
    return ArticleModelHelper.createContent(this.title, this.body)
  }

  get rawData(): Article {
    return {
      id: this.id,
      title: this.title,
      body: this.body
    }
  }
}
