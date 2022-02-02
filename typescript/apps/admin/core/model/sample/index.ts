import { ISamplePostModel } from "./interface"

export class SamplePostModelImpl implements ISamplePostModel {
  readonly id: number
  readonly title: string
  readonly body: string

  constructor(id: number, title: string, body: string) {
    this.id = id
    this.title = title
    this.body = body
  }
}
