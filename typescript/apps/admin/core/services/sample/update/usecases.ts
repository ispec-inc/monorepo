import { SampleGateway } from "~/core/gateways/sample";
import { ISamplePostModel } from "~/core/models/domain/sample";
import { ISampleUpdatePayloadModel } from "~/core/models/payload/sample/update";


export interface ISampleUpdatePageUsecases {
  fetch(id: number): Promise<ISamplePostModel>
  update(id: number, payload: ISampleUpdatePayloadModel): Promise<void>
}

export class SampleUpdatePageUsecasesImpl implements ISampleUpdatePageUsecases {
  fetch(id: number): Promise<ISamplePostModel> {
    return SampleGateway.find(id)
  }

  update(id: number, payload: ISampleUpdatePayloadModel): Promise<void> {
    return SampleGateway.update(id, payload)
  }
}
