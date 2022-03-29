import { ISamplePostModel, SamplePostModelImpl } from "~/core/models/domain/sample";
import { Maybe } from "~/types/advanced";
import { NaturalNumber } from "~/types/value-object/natural-number";
import { client } from "~/utils/api";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";

export interface ISamplePostFindAllRepository {
  readonly isAwaitingResponse: boolean
  readonly posts: Maybe<ISamplePostModel[]>

  fetch(): Promise<ISamplePostModel[]>
}

export class SamplePostFindAllRepositoryImpl implements ISamplePostFindAllRepository {
  private readonly endpoint = new AsyncProcessHelper(client.posts.$get)

  private _posts: Maybe<SamplePostModelImpl[]> = null

  async fetch(): Promise<SamplePostModelImpl[]> {
    const res = await this.endpoint.run().catch((err) => { throw err })
    const models = res.map((v) => new SamplePostModelImpl({
      id: new NaturalNumber(v.id),
      title: v.title,
      body: v.body
    }))
    this._posts = models
    return models
  }

  get posts(): Maybe<SamplePostModelImpl[]> {
    return this._posts
  }

  get isAwaitingResponse(): boolean {
    return this.endpoint.isAwaitingResponse
  }
}
