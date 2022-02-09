import { ISampleListUsecases } from "./usecases";
import { ServiceBase } from "~/core/service/_base";
import { ISamplePostModel } from "~/core/model/domain/sample";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";
import ErrorModel from "~/core/model/error";
import { Stream } from "~/utils/stream";

export class SampleListPageService extends ServiceBase<ISampleListUsecases> {
  private _posts: ISamplePostModel[] = []
  private readonly fetchHelper: AsyncProcessHelper<ISamplePostModel[], []>

  constructor(usecases: ISampleListUsecases) {
    super(usecases)

    this.fetchHelper = new AsyncProcessHelper(usecases.findAll.bind(usecases))
  }

  async fetch(): Promise<void> {
    this._posts = await this.fetchHelper.run()
      .catch((e) => {
        const model = new ErrorModel(e)
        this.fetchHelper.setErrorMessage(model.message)
        return []
      })
  }

  get slicedPosts(): ISamplePostModel[] {
    return this._posts.slice(0, 10)
  }

  get isAwaiting(): boolean {
    return this.fetchHelper.isAwaitingResponse
  }

  get errorStream(): Stream<string> {
    return this.fetchHelper.errorMessageStream
  }
}
