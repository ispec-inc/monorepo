

import { ISampleDetailPageUsecases } from "./usecases";
import { ServiceBase } from "~/core/service/_base";
import { ISamplePostModel } from "~/core/model/sample";
import { Maybe } from "~/types/advanced";
import { ISamplePostCommentModel, SamplePostCommentEntry } from "~/core/model/sample/comment";

export class SampleDetailPageService extends ServiceBase<ISampleDetailPageUsecases> {
  private _post: Maybe<ISamplePostModel> = null
  private _comments: Maybe<ISamplePostCommentModel[]> = null

  async fetch(id: number): Promise<void> {
    this.clearData()
    this._post = await this.usecases.fetch(id)
    this._comments = await this.usecases.fetchComments(id)
  }

  clearData(): void {
    this._post = null
    this._comments = null
  }

  get title(): string {
    return this._post?.title ?? ''
  }

  get body(): string {
    return this._post?.body ?? ''
  }

  get commentEntries(): SamplePostCommentEntry[] {
    return (this._comments ?? []).map((c) => c.toEntry())
  }
}
