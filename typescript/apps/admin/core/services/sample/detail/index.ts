import { merge, Observable } from 'rxjs'
import { ISampleDetailPageUsecases } from "./usecases";
import { ServiceBase } from "~/core/services/_base";
import { ISamplePostModel } from "~/core/models/domain/sample";
import { Maybe } from "~/types/advanced";
import { ISamplePostCommentModel, SamplePostCommentEntry } from "~/core/models/domain/sample/comment";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";
import ErrorModel from "~/core/models/error";

export class SampleDetailPageService extends ServiceBase<ISampleDetailPageUsecases> {
  private _post: Maybe<ISamplePostModel> = null
  private _comments: Maybe<ISamplePostCommentModel[]> = null

  private readonly fetchPostHelper: AsyncProcessHelper<ISamplePostModel, Parameters<ISampleDetailPageUsecases['fetch']>>
  private readonly fetchCommentsHelper: AsyncProcessHelper<ISamplePostCommentModel[], Parameters<ISampleDetailPageUsecases['fetchComments']>>

  constructor(usecase: ISampleDetailPageUsecases) {
    super(usecase)

    this.fetchPostHelper = new AsyncProcessHelper(usecase.fetch.bind(usecase))
    this.fetchCommentsHelper = new AsyncProcessHelper(usecase.fetchComments.bind(usecase))
  }

  fetch(id: number): void {
    this.clearData()
    this.fetchPost(id)
    this.fetchComments(id)
  }

  private async fetchPost(id: number): Promise<void> {
    this._post = await this.fetchPostHelper.run(id)
      .catch((e) => {
        const model = new ErrorModel(e)
        this.fetchPostHelper.setErrorMessage(model.message)
        return null
      })
  }

  private async fetchComments(id: number): Promise<void> {
    this._comments = await this.fetchCommentsHelper.run(id)
      .catch((e) => {
        const model = new ErrorModel(e)
        this.fetchCommentsHelper.setErrorMessage(model.message)
        return null
      })
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

  get isAwaitingPost(): boolean {
    return this.fetchPostHelper.isAwaitingResponse
  }

  get isAwaitingComments(): boolean {
    return this.fetchCommentsHelper.isAwaitingResponse
  }

  get errorStream(): Observable<string> {
    return merge(
      this.fetchPostHelper.errorMessageStream,
      this.fetchCommentsHelper.errorMessageStream
    )
  }
}
