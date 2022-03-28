interface Params {
  readonly id: number
  readonly title: string
  readonly body: string
}

export interface ISamplePostModel extends Params {}

export class SamplePostModelImpl implements ISamplePostModel {
  readonly id: number
  readonly title: string
  readonly body: string

  constructor(params: Params) {
    const { id, title, body } = params
    this.id = id
    this.title = title
    this.body = body
  }
}
