import { merge, Observable } from 'rxjs'
import { ISampleUpdatePageUsecases } from "./usecases";
import { ServiceBase } from "~/core/service/_base";
import { SampleUpdatePayloadModelImpl } from "~/core/model/payload/sample/update";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";
import { ISamplePostModel, SamplePostModelImpl } from "~/core/model/domain/sample";
import ErrorModel from "~/core/model/error";
import { Maybe } from '~/types/advanced';

export class SampleUpdatePageService extends ServiceBase<ISampleUpdatePageUsecases> {
  private readonly fetchHelper: AsyncProcessHelper<SamplePostModelImpl, Parameters<ISampleUpdatePageUsecases['fetch']>>
  private readonly updateHelper: AsyncProcessHelper<void, Parameters<ISampleUpdatePageUsecases['update']>>

  constructor(usecases: ISampleUpdatePageUsecases) {
    super(usecases)

    this.fetchHelper = new AsyncProcessHelper(usecases.fetch.bind(usecases))
    this.updateHelper = new AsyncProcessHelper(usecases.update.bind(usecases))
  }

  async fetch(id: number): Promise<Maybe<ISamplePostModel>> {
    return await this.fetchHelper.run(id).catch((e) => {
      const model = new ErrorModel(e);
      this.updateHelper.setErrorMessage(model.message);
      return null
    })
  }

  async update(id: number, title: string, body: string): Promise<void> {
    const payload = new SampleUpdatePayloadModelImpl(title, body)
    return await this.updateHelper.run(id, payload)
      .catch((e) => {
        const model = new ErrorModel(e)
        this.updateHelper.setErrorMessage(model.message)
      })
  }

  get isAwaiting(): boolean {
    return this.fetchHelper.isAwaitingResponse || this.updateHelper.isAwaitingResponse
  }

  get errorStream(): Observable<string> {
    return merge(this.fetchHelper.errorMessageStream, this.updateHelper.errorMessageStream)
  }
}
