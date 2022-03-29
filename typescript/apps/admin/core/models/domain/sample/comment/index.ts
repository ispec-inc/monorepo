import { NaturalNumber } from "~/types/value-object/natural-number"

export type SamplePostCommentEntry = [id: NaturalNumber, value: { name: string, email: string, body: string }]

interface Params {
  readonly id: NaturalNumber
  readonly name: string
  readonly email: string
  readonly body: string
}

export interface ISamplePostCommentModel extends Params {
  toEntry(): SamplePostCommentEntry
}

export class SamplePostCommentModelImpl implements ISamplePostCommentModel {
  readonly id: NaturalNumber
  readonly name: string
  readonly email: string
  readonly body: string

  constructor(params: Params) {
    const { id, name, email, body } = params
    this.id = id
    this.name = name
    this.email = email
    this.body = body
  }

  toEntry(): SamplePostCommentEntry {
    return [this.id, { name: this.name, email: this.email, body: this.body }]
  }
}
