

import { SamplePostModel } from "~/core/models/domain/sample";
import { SamplePostCommentModel } from "~/core/models/domain/sample/comment";
import { ISampleCommentFindAllRepository } from "~/core/repositories/sample/comment/find-all";
import { ISamplePostFindRepository } from "~/core/repositories/sample/post/find";
import { ServiceBase } from "~/core/services/_base";
import { SamplePostId } from "~/core/values/sample/post/id";
import { Maybe } from "~/types/advanced";

interface Repositories {
  find: ISamplePostFindRepository
  comments: ISampleCommentFindAllRepository
}

export class SampleDetailPageService extends ServiceBase<Repositories> {
  async fetch(id: SamplePostId): Promise<void> {
    await Promise.all([
      this.repositories.find.fetch(id).catch((err) => { throw err }),
      this.repositories.comments.fetch(id).catch((err) => { throw err })
    ])
  }

  get isAwaitingPost(): boolean {
    return this.repositories.find.isAwaitingResponse
  }

  get isAwaitingComments(): boolean {
    return this.repositories.comments.isAwaitingResponse
  }

  get post(): Maybe<SamplePostModel> {
    return this.repositories.find.post
  }

  get comments(): SamplePostCommentModel[] {
    return this.repositories.comments.comments ?? []
  }
}
