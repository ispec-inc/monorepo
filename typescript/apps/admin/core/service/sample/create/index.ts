

import { ISampleCreatePageUsecases } from "./usecases";
import { ServiceBase } from "~/core/service/_base";
import { SampleCreatePayloadModelImpl } from "~/core/model/payload/sample/create";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";
import ErrorModel from "~/core/model/error";
import { Stream } from "~/utils/stream";

type CreateParams = Parameters<ISampleCreatePageUsecases['create']>

export class SampleCreatePageService extends ServiceBase<ISampleCreatePageUsecases> {
  private readonly asyncProcessHelper: AsyncProcessHelper<void, CreateParams>

  constructor(usecase: ISampleCreatePageUsecases) {
    super(usecase)

    this.asyncProcessHelper = new AsyncProcessHelper<void, CreateParams>(usecase.create.bind(usecase))
  }

  async create(userId: number, title: string, body: string): Promise<void> {
    const payload = new SampleCreatePayloadModelImpl(userId, title, body)
    return await this.asyncProcessHelper.run(payload)
      .catch((e) => {
        const model = new ErrorModel(e)
        this.asyncProcessHelper.setErrorMessage(model.message)
      })
  }

  get isAwaiting(): boolean {
    return this.asyncProcessHelper.isAwaitingResponse
  }

  get errorStream(): Stream<string> {
    return this.asyncProcessHelper.errorMessageStream
  }
}
