

import { ISampleUpdatePayloadModel } from "~/core/models/payload/sample/update";
import { SamplePostId } from "~/core/values/sample/post/id";
import { SamplePostUpdateRequest } from "~/types/request/sample/update";
import { client } from "~/utils/api";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";

export interface ISamplePostUpdateRepository {
  readonly isAwaitingResponse: boolean
  patch(id: SamplePostId, payload: ISampleUpdatePayloadModel): Promise<void>
}

export class SamplePostUpdateRepositoryImpl implements ISamplePostUpdateRepository {
  private readonly endpoint = new AsyncProcessHelper((id: number, body: SamplePostUpdateRequest) => client.posts._id(id).$patch({ body }))

  async patch(id: SamplePostId, payload: ISampleUpdatePayloadModel): Promise<void> {
    await this.endpoint.run(id.value, payload.toObject()).catch((err) => { throw err })
  }

  get isAwaitingResponse(): boolean {
    return this.endpoint.isAwaitingResponse
  }
}
