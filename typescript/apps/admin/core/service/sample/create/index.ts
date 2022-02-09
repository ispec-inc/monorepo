

import { ISampleCreatePageUsecases } from "./usecases";
import { ServiceBase } from "~/core/service/_base";
import { SampleCreatePayloadModelImpl } from "~/core/model/payload/sample/create";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";

type CreateParams = Parameters<ISampleCreatePageUsecases['create']>

export class SampleCreatePageService extends ServiceBase<ISampleCreatePageUsecases> {
  private readonly asyncProcessHelper: AsyncProcessHelper<void, CreateParams>

  constructor(usecase: ISampleCreatePageUsecases) {
    super(usecase)

    this.asyncProcessHelper = new AsyncProcessHelper<void, CreateParams>(usecase.create.bind(usecase))
  }

  create(userId: number, title: string, body: string): Promise<void> {
    const payload = new SampleCreatePayloadModelImpl(userId, title, body)
    return this.asyncProcessHelper.run(payload)
  }

  get isAwaiting(): boolean {
    return this.asyncProcessHelper.isAwaitingResponse
  }
}
