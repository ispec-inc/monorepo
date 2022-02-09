

import { ISampleUpdatePageUsecases } from "./usecases";
import { ServiceBase } from "~/core/service/_base";
import { SampleUpdatePayloadModelImpl } from "~/core/model/payload/sample/update";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";
import { SamplePostModelImpl } from "~/core/model/domain/sample";

export class SampleUpdatePageService extends ServiceBase<ISampleUpdatePageUsecases> {
  private readonly fetchHelper: AsyncProcessHelper<SamplePostModelImpl, Parameters<ISampleUpdatePageUsecases['fetch']>>
  private readonly updateHelper: AsyncProcessHelper<void, Parameters<ISampleUpdatePageUsecases['update']>>

  constructor(usecases: ISampleUpdatePageUsecases) {
    super(usecases)

    this.fetchHelper = new AsyncProcessHelper(usecases.fetch.bind(usecases))
    this.updateHelper = new AsyncProcessHelper(usecases.update.bind(usecases))
  }

  fetch(id: number): void {
    const model = this.fetchHelper.run(id)
  }

  update(title: string, body: string): void {
    const payload = new SampleUpdatePayloadModelImpl(title, body)
    this.usecases.update(payload)
  }
}
