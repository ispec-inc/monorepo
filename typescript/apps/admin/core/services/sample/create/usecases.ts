import { SampleGateway } from "~/core/gateways/sample";
import { ISampleCreatePayloadModel } from "~/core/models/payload/sample/create";

export interface ISampleCreatePageUsecases {
  create(payload: ISampleCreatePayloadModel): Promise<void>
}

export class SampleCreatePageUsecasesImpl implements ISampleCreatePageUsecases {
  create(payload: ISampleCreatePayloadModel): Promise<void> {
    return SampleGateway.create(payload)
  }
}
