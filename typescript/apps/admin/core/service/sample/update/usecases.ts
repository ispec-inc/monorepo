import { SampleGateway } from "~/core/gateway/sample";
import { ISamplePostModel, SamplePostModelImpl } from "~/core/model/domain/sample";
import { ISampleUpdatePayloadModel } from "~/core/model/payload/sample/update";


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
