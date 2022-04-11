

import { SamplePostModel } from "~/core/models/domain/sample";
import { Maybe } from "~/types/advanced";
import { client } from "~/utils/api";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";
import { SamplePostId } from "~/core/values/sample/post/id";

export interface ISamplePostFindRepository {
  readonly isAwaitingResponse: boolean
  readonly post: Maybe<SamplePostModel>

  fetch(id: SamplePostId): Promise<SamplePostModel>
}

export class SamplePostFindRepositoryImpl implements ISamplePostFindRepository {
  private readonly endpoint = new AsyncProcessHelper((id: number) => client.posts._id(id).$get())

  private _post: Maybe<SamplePostModel> = null

  async fetch(id: SamplePostId): Promise<SamplePostModel> {
    const res = await this.endpoint.run(id.value).catch((err) => { throw err })
    const model = new SamplePostModel({
      id: new SamplePostId(res.id),
      title: res.title,
      body: res.body
    })
    this._post = model
    return model
  }

  get post(): Maybe<SamplePostModel> {
    return this._post
  }

  get isAwaitingResponse(): boolean {
    return this.endpoint.isAwaitingResponse
  }
}
