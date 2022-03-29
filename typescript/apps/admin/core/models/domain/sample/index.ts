import { NaturalNumber } from "~/types/value-object/natural-number"

interface Params {
  readonly id: NaturalNumber
  readonly title: string
  readonly body: string
}

export interface ISamplePostModel extends Params {}

export class SamplePostModelImpl implements ISamplePostModel {
  readonly id: NaturalNumber
  readonly title: string
  readonly body: string

  constructor(params: Params) {
    const { id, title, body } = params
    this.id = id
    this.title = title
    this.body = body
  }
}
