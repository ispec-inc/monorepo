import { SamplePostModel } from "~/core/models/domain/sample";
import { SampleUpdatePayloadModelImpl } from "~/core/models/payload/sample/update";
import { ISamplePostFindRepository } from "~/core/repositories/sample/post/find";
import { ISamplePostUpdateRepository } from "~/core/repositories/sample/post/update";
import { ServiceBase } from "~/core/services/_base";
import { SamplePostId } from "~/core/values/sample/post/id";

interface Repositories {
  find: ISamplePostFindRepository
  update: ISamplePostUpdateRepository
}

export class SampleUpdatePageService extends ServiceBase<Repositories> {
  async fetch(id: SamplePostId): Promise<SamplePostModel> {
    const model = await this.repositories.find.fetch(id).catch((err) => { throw err })

    return model
  }

  async update(id: SamplePostId, title: string, body: string): Promise<void> {
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
