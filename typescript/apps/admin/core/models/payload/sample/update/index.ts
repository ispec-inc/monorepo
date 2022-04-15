
import { IPayloadModel } from "~/core/models/payload/_interface";
import { SamplePostUpdateRequest } from "~/types/request/sample/update";

interface Params {
  readonly title: string
  readonly body: string
}

export interface ISampleUpdatePayloadModel extends Params, IPayloadModel<SamplePostUpdateRequest> {}

export class SampleUpdatePayloadModelImpl implements ISampleUpdatePayloadModel {
  readonly title: string
  readonly body: string

  constructor(params: Params) {
    const { title, body } = params
    this.title = title
    this.body = body
  }

  toObject(): SamplePostUpdateRequest {
    return {
      title: this.title,
      body: this.body
    }
  }
}

