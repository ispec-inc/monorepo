

import { ISampleCreatePayloadModel } from "~/core/models/payload/sample/create";
import { client } from "~/utils/api";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";

export interface ISamplePostCreateRepository {
  readonly isAwaitingResponse: boolean
  post(payload: ISampleCreatePayloadModel): Promise<void>
}


export class SamplePostCreateRepositoryImpl implements ISamplePostCreateRepository {
  private readonly endpoint = new AsyncProcessHelper(client.posts.$post)

  async post(payload: ISampleCreatePayloadModel): Promise<void> {
    await this.endpoint.run({ body: payload.toObject() }).catch((err) => { throw err })
  }

  get isAwaitingResponse(): boolean {
    return this.endpoint.isAwaitingResponse
  }
}
