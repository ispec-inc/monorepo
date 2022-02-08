import { SamplePostCommentResponse } from "~/types/response/sample"

export type SamplePostCommentEntry = [id: number, value: { name: string, email: string, body: string }]

export interface ISamplePostCommentModel {
  readonly id: number
  readonly name: string
  readonly email: string
  readonly body: string

  toEntry(): SamplePostCommentEntry
}

export class SamplePostCommentModelImpl implements ISamplePostCommentModel {
  readonly id: number
  readonly name: string
  readonly email: string
  readonly body: string

  constructor(id: number, name: string, email: string, body: string) {
    this.id = id
    this.name = name
    this.email = email
    this.body = body
  }

  toEntry(): SamplePostCommentEntry {
    return [this.id, { name: this.name, email: this.email, body: this.body }]
  }

  static fromApiResponse(response: SamplePostCommentResponse): SamplePostCommentModelImpl {
    const { id, name, email, body } = response
    return new this(id, name, email, body)
  }
}
