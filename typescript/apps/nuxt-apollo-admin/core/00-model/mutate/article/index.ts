import { CreateArticleRequest } from '~/types/request/create-article'

export interface ICreateArticleMutateModel {
  variables: CreateArticleRequest
}

export class CreateArticleMutateModel implements ICreateArticleMutateModel {
  _title: string
  _body: string

  constructor(title: string, body: string) {
    this._title = title
    this._body = body
  }

  get variables(): CreateArticleRequest {
    const title = this._title
    const body = this._body
    return {
      title,
      body
    }
  }
}
