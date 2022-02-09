
import { IPayloadModel } from "~/core/model/payload/_interface";
import { SamplePostUpdateRequest } from "~/types/request/sample/update";

export interface ISampleUpdatePayloadModel extends IPayloadModel<SamplePostUpdateRequest> {}

export class SampleUpdatePayloadModelImpl implements ISampleUpdatePayloadModel {
  readonly title: string
  readonly body: string

  constructor(title: string, body: string) {
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

