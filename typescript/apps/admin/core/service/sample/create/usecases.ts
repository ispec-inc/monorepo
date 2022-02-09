import { SampleGateway } from "~/core/gateway/sample";
import { ISampleCreatePayloadModel } from "~/core/model/payload/sample/create";

export interface ISampleCreatePageUsecases {
  create(payload: ISampleCreatePayloadModel): Promise<void>
}

export class SampleCreatePageUsecasesImpl implements ISampleCreatePageUsecases {
  create(payload: ISampleCreatePayloadModel): Promise<void> {
    return SampleGateway.create(payload)
  }
}
