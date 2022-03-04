import { CreateCompanyRequest } from '~/types/request/create-company'

export interface ICreateCompanyMutateModel {
  variables: CreateCompanyRequest
}

export class CreateCompanyMutateModel implements ICreateCompanyMutateModel {
  readonly _title: string
  readonly _body: string

  constructor(title: string, body: string) {
    this._title = title
    this._body = body
  }

  get variables(): CreateCompanyRequest {
    const title = this._title
    const body = this._body
    return {
      title,
      body
    }
  }
}
