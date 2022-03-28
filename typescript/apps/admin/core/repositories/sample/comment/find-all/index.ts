

import { SamplePostCommentModelImpl } from "~/core/models/domain/sample/comment";
import { Maybe } from "~/types/advanced";
import { client } from "~/utils/api";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";

export interface ISampleCommentFindAllRepository {
  readonly isAwaitingResponse: boolean
  readonly comments: Maybe<SamplePostCommentModelImpl[]>

  fetch(id: number): Promise<SamplePostCommentModelImpl[]>
}

export class SampleCommentFindAllRepositoryImpl implements ISampleCommentFindAllRepository {
  private readonly endpoint = new AsyncProcessHelper((id: number) => client.posts._id(id).comments.$get())

  private _comments: Maybe<SamplePostCommentModelImpl[]> = null

  async fetch(id: number): Promise<SamplePostCommentModelImpl[]> {
    const res = await this.endpoint.run(id).catch((err) => { throw err })
    const models = res.map((v) => new SamplePostCommentModelImpl(v))
    this._comments = models
    return models
  }

  get comments(): Maybe<SamplePostCommentModelImpl[]> {
    return this._comments
  }

  get isAwaitingResponse(): boolean {
    return this.endpoint.isAwaitingResponse
  }
}
