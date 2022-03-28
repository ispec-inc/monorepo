import { SamplePostModelImpl } from "~/core/models/domain/sample";
import { Maybe } from "~/types/advanced";
import { client } from "~/utils/api";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";

export interface ISamplePostFindAllRepository {
  readonly isAwaitingResponse: boolean
  readonly posts: Maybe<SamplePostModelImpl[]>

  fetch(): Promise<SamplePostModelImpl[]>
}

export class SamplePostFindAllRepositoryImpl implements ISamplePostFindAllRepository {
  private readonly endpoint = new AsyncProcessHelper(client.posts.$get)

  private _posts: Maybe<SamplePostModelImpl[]> = null

  async fetch(): Promise<SamplePostModelImpl[]> {
    const res = await this.endpoint.run().catch((err) => { throw err })
    const models = res.map((v) => new SamplePostModelImpl(v))
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
