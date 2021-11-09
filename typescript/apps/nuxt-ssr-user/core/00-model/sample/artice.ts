import { SampleAuthorModel } from "./author";
import { SampleArticleEndpoint } from "~/core/01-gateway/sample/article";

export class SampleArticleModel {
  readonly author: SampleAuthorModel
  readonly id: number
  readonly title: string
  readonly content: string

  constructor(id: number, title: string, content: string, author: SampleAuthorModel) {
    this.id = id
    this.author = author.clone()
    this.title = title
    this.content = content
  }

  static fromApiResponse(value: SampleArticleEndpoint.Article): SampleArticleModel {
    const { id, title, content, author } = value
    const authorModel = new SampleAuthorModel(author.id, author.firstName, author.lastName)
    return new SampleArticleModel(id, title, content, authorModel)
  }
}
