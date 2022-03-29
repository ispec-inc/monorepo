import { ServiceBase } from "~/core/services/_base";
import { ISamplePostFindAllRepository } from "~/core/repositories/sample/post/find-all";
import { ISamplePostModel } from "~/core/models/domain/sample";

interface Repositories {
  findAll: ISamplePostFindAllRepository
}

export class SampleListPageService extends ServiceBase<Repositories> {
  async fetch(): Promise<void> {
    await this.repositories.findAll.fetch().catch((err) => { throw err })
  }

  get isAwaitingFetch(): boolean {
    return this.repositories.findAll.isAwaitingResponse
  }

  get posts(): ISamplePostModel[] {
    return this.repositories.findAll.posts ?? []
  }
}
