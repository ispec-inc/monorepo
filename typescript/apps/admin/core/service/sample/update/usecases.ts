import { SamplePostModelImpl } from "~/core/model/domain/sample";
import { ISampleUpdatePayloadModel } from "~/core/model/payload/sample/update";


export interface ISampleUpdatePageUsecases {
  fetch(id: number): Promise<SamplePostModelImpl>
  update(payload: ISampleUpdatePayloadModel): Promise<void>
}

export class SampleUpdatePageUsecasesImpl implements ISampleUpdatePageUsecases {}
