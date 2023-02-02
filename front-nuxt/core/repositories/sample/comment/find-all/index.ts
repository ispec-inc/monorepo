

import { SamplePostCommentModel } from "~/core/models/domain/sample/comment";
import { Maybe } from "~/types/advanced";
import { client } from "~/utils/api";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";
import { SamplePostId } from "~/core/values/sample/post/id";
import { SamplePostCommentId } from "~/core/values/sample/post/comment/id";

export interface ISampleCommentFindAllRepository {
  readonly isAwaitingResponse: boolean
  readonly comments: Maybe<SamplePostCommentModel[]>

  fetch(id: SamplePostId): Promise<SamplePostCommentModel[]>
}

export class SampleCommentFindAllRepositoryImpl implements ISampleCommentFindAllRepository {
  private readonly endpoint = new AsyncProcessHelper((id: number) => client.posts._id(id).comments.$get())

  private _comments: Maybe<SamplePostCommentModel[]> = null

  async fetch(id: SamplePostId): Promise<SamplePostCommentModel[]> {
    const res = await this.endpoint.run(id.value).catch((err) => { throw err })
    const models = res.map((v) => new SamplePostCommentModel({
      id: new SamplePostCommentId(v.id),
      name: v.name,
      email: v.email,
      body: v.body
    }))
    this._comments = models
    return models
  }

  get comments(): Maybe<SamplePostCommentModel[]> {
    return this._comments
  }

  get isAwaitingResponse(): boolean {
    return this.endpoint.isAwaitingResponse
  }
}
