import { Article } from '~/types/model/article'
import { ArticleOption } from '~/types/article-option'
import { ArticleModelHelper } from '~/core/00-model/other/article/helper'
import { ArticleContent } from '~/types/article-content'

export interface IArticleModel {
  id: string
  title: string
  body: string
  writer: string
  articleOption: ArticleOption
  titleBody: ArticleContent
}

export class ArticleModel implements IArticleModel {
  private readonly _id: string
  private readonly _title: string
  private readonly _body: string
  private readonly _writer: string

  constructor(data: Article) {
    this._id = data.id
    this._title = data.title
    this._body = data.body
    this._writer = data.writer
  }

  get id(): string {
    return this._id
  }

  get title(): string {
    return this._title
  }

  get body(): string {
    return this._body
  }

  get writer(): string {
    return this._writer
  }

  get articleOption(): ArticleOption {
    return ArticleModelHelper.pairIdTitle(this._id, this._title)
  }

  get titleBody(): ArticleContent {
    return ArticleModelHelper.createContent(this._title, this._body)
  }
}
