

import { ISampleUpdatePayloadModel } from "~/core/models/payload/sample/update";
import { SamplePostUpdateRequest } from "~/types/request/sample/update";
import { NaturalNumber } from "~/types/value-object/natural-number";
import { client } from "~/utils/api";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";

export interface ISamplePostUpdateRepository {
  readonly isAwaitingResponse: boolean
  patch(id: NaturalNumber, payload: ISampleUpdatePayloadModel): Promise<void>
}

export class SamplePostUpdateRepositoryImpl implements ISamplePostUpdateRepository {
  private readonly endpoint = new AsyncProcessHelper((id: number, body: SamplePostUpdateRequest) => client.posts._id(id).$patch({ body }))

  async patch(id: NaturalNumber, payload: ISampleUpdatePayloadModel): Promise<void> {
    await this.endpoint.run(id.value, payload.toObject()).catch((err) => { throw err })
  }

  get isAwaitingResponse(): boolean {
    return this.endpoint.isAwaitingResponse
  }
}
