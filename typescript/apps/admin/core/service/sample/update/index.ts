

import { ISampleUpdatePageUsecases } from "./usecases";
import { ServiceBase } from "~/core/service/_base";
import { SampleUpdatePayloadModelImpl } from "~/core/model/payload/sample/update";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";
import { ISamplePostModel, SamplePostModelImpl } from "~/core/model/domain/sample";

export class SampleUpdatePageService extends ServiceBase<ISampleUpdatePageUsecases> {
  private readonly fetchHelper: AsyncProcessHelper<SamplePostModelImpl, Parameters<ISampleUpdatePageUsecases['fetch']>>
  private readonly updateHelper: AsyncProcessHelper<void, Parameters<ISampleUpdatePageUsecases['update']>>

  constructor(usecases: ISampleUpdatePageUsecases) {
    super(usecases)

    this.fetchHelper = new AsyncProcessHelper(usecases.fetch.bind(usecases))
    this.updateHelper = new AsyncProcessHelper(usecases.update.bind(usecases))
  }

  fetch(id: number): Promise<ISamplePostModel> {
    return this.fetchHelper.run(id)
  }

  update(id: number, title: string, body: string): Promise<void> {
    const payload = new SampleUpdatePayloadModelImpl(title, body)
    return this.updateHelper.run(id, payload)
  }

  get isAwaiting(): boolean {
    return this.fetchHelper.isAwaitingResponse || this.updateHelper.isAwaitingResponse
  }
}
