

import { ISamplePostModel } from "~/core/models/domain/sample";
import { SampleUpdatePayloadModelImpl } from "~/core/models/payload/sample/update";
import { ISamplePostFindRepository } from "~/core/repositories/sample/post/find";
import { ISamplePostUpdateRepository } from "~/core/repositories/sample/post/update";
import { ServiceBase } from "~/core/services/_base";
import { NaturalNumber } from "~/types/value-object/natural-number";

interface Repositories {
  find: ISamplePostFindRepository
  update: ISamplePostUpdateRepository
}

export class SampleUpdatePageService extends ServiceBase<Repositories> {
  async fetch(id: NaturalNumber): Promise<ISamplePostModel> {
    const model = await this.repositories.find.fetch(id).catch((err) => { throw err })

    return model
  }

  async update(id: NaturalNumber, title: string, body: string): Promise<void> {
    const payload = new SampleUpdatePayloadModelImpl({
      title,
      body
    })
    await this.repositories.update.patch(id, payload).catch((err) => { throw err })
  }

  get isAwaiting(): boolean {
    return this.repositories.find.isAwaitingResponse || this.repositories.update.isAwaitingResponse
  }
}
