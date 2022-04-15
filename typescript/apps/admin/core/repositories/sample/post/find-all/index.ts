import { SamplePostModel } from "~/core/models/domain/sample";
import { SamplePostId } from "~/core/values/sample/post/id";
import { Maybe } from "~/types/advanced";
import { client } from "~/utils/api";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";

export interface ISamplePostFindAllRepository {
  readonly isAwaitingResponse: boolean
  readonly posts: Maybe<SamplePostModel[]>

  fetch(): Promise<SamplePostModel[]>
}

export class SamplePostFindAllRepositoryImpl implements ISamplePostFindAllRepository {
  private readonly endpoint = new AsyncProcessHelper(client.posts.$get)

  private _posts: Maybe<SamplePostModel[]> = null

  async fetch(): Promise<SamplePostModel[]> {
    const res = await this.endpoint.run().catch((err) => { throw err })
    const models = res.map((v) => new SamplePostModel({
      id: new SamplePostId(v.id),
      title: v.title,
      body: v.body
    }))
    this._posts = models
    return models
  }

  get posts(): Maybe<SamplePostModel[]> {
    return this._posts
  }

  get isAwaitingResponse(): boolean {
    return this.endpoint.isAwaitingResponse
  }
}
