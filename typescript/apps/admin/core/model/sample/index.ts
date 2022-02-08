import { ISamplePostModel } from "./interface"
import { SamplePostResponse } from "~/types/response/sample"

export class SamplePostModelImpl implements ISamplePostModel {
  readonly id: number
  readonly title: string
  readonly body: string

  constructor(id: number, title: string, body: string) {
    this.id = id
    this.title = title
    this.body = body
  }

  static fromApiResponse(response: SamplePostResponse): SamplePostModelImpl {
    return new this(response.id, response.title, response.body)
  }
}
