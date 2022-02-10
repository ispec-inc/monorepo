import { IPayloadModel } from "../../_interface";
import { SamplePostCreateRequest } from "~/types/request/sample/create";

export interface ISampleCreatePayloadModel extends IPayloadModel<SamplePostCreateRequest> {}

export class SampleCreatePayloadModelImpl implements ISampleCreatePayloadModel {
  readonly userId: number
  readonly title: string
  readonly body: string

  constructor(userId: number, title: string, body: string) {
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
