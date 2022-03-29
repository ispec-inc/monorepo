

import { SamplePostCommentModelImpl } from "~/core/models/domain/sample/comment";
import { Maybe } from "~/types/advanced";
import { NaturalNumber } from "~/types/value-object/natural-number";
import { client } from "~/utils/api";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";

export interface ISampleCommentFindAllRepository {
  readonly isAwaitingResponse: boolean
  readonly comments: Maybe<SamplePostCommentModelImpl[]>

  fetch(id: NaturalNumber): Promise<SamplePostCommentModelImpl[]>
}

export class SampleCommentFindAllRepositoryImpl implements ISampleCommentFindAllRepository {
  private readonly endpoint = new AsyncProcessHelper((id: number) => client.posts._id(id).comments.$get())

  private _comments: Maybe<SamplePostCommentModelImpl[]> = null

  async fetch(id: NaturalNumber): Promise<SamplePostCommentModelImpl[]> {
    const res = await this.endpoint.run(id.value).catch((err) => { throw err })
    const models = res.map((v) => new SamplePostCommentModelImpl({
      id: new NaturalNumber(v.id),
      name: v.name,
      email: v.email,
      body: v.body
    }))
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
