

import { SampleCreatePayloadModelImpl } from "~/core/models/payload/sample/create";
import { ISamplePostCreateRepository } from "~/core/repositories/sample/post/create";
import { ServiceBase } from "~/core/services/_base";

interface Repositories {
  create: ISamplePostCreateRepository
}

export class SampleCreatePageService extends ServiceBase<Repositories> {
  async create(userId: number, title: string, body: string): Promise<void> {
    const payload = new SampleCreatePayloadModelImpl({
      userId,
      title,
      body
    })

    await this.repositories.create.post(payload).catch((err) => { throw err })
  }

  get isAwaiting(): boolean {
    return this.repositories.create.isAwaitingResponse
  }
}
