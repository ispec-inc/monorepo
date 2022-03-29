

import { SamplePostModelImpl } from "~/core/models/domain/sample";
import { Maybe } from "~/types/advanced";
import { NaturalNumber } from "~/types/value-object/natural-number";
import { client } from "~/utils/api";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";

export interface ISamplePostFindRepository {
  readonly isAwaitingResponse: boolean
  readonly post: Maybe<SamplePostModelImpl>

  fetch(id: NaturalNumber): Promise<SamplePostModelImpl>
}


export class SamplePostFindRepositoryImpl implements ISamplePostFindRepository {
  private readonly endpoint = new AsyncProcessHelper((id: number) => client.posts._id(id).$get())

  private _post: Maybe<SamplePostModelImpl> = null

  async fetch(id: NaturalNumber): Promise<SamplePostModelImpl> {
    const res = await this.endpoint.run(id.value).catch((err) => { throw err })
    const model = new SamplePostModelImpl({
      id: new NaturalNumber(res.id),
      title: res.title,
      body: res.body
    })
    this._post = model
    return model
  }

  get post(): Maybe<SamplePostModelImpl> {
    return this._post
  }

  get isAwaitingResponse(): boolean {
    return this.endpoint.isAwaitingResponse
  }
}
