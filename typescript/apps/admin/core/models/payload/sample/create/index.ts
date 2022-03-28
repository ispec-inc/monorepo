import { IPayloadModel } from "../../_interface";
import { SamplePostCreateRequest } from "~/types/request/sample/create";

interface Params {
  readonly userId: number
  readonly title: string
  readonly body: string
}

export interface ISampleCreatePayloadModel extends Params, IPayloadModel<SamplePostCreateRequest> {}

export class SampleCreatePayloadModelImpl implements ISampleCreatePayloadModel {
  readonly userId: number
  readonly title: string
  readonly body: string

  constructor(params: Params) {
    const { userId, title, body } = params
    this.userId = userId
    this.title = title
    this.body = body
  }

  toObject(): SamplePostCreateRequest {
    return {
      userId: this.userId,
      title: this.title,
      body: this.body
    }
  }
}
