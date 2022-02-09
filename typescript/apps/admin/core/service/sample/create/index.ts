

import { ISampleCreatePageUsecases } from "./usecases";
import { ServiceBase } from "~/core/service/_base";
import { SampleCreatePayloadModelImpl } from "~/core/model/payload/sample/create";
import { AsyncProcessHelper } from "~/utils/aync-process-helper";

type CreateParams = Parameters<ISampleCreatePageUsecases['create']>

export class SampleCreatePageService extends ServiceBase<ISampleCreatePageUsecases> {
  private readonly asyncProcessHelper: AsyncProcessHelper<void, CreateParams>
  private onCreationSucceed = (): void => { return undefined }

  constructor(usecase: ISampleCreatePageUsecases) {
    super(usecase)

    this.asyncProcessHelper = new AsyncProcessHelper<void, CreateParams>(usecase.create.bind(usecase))
      .onSuccess(() => this.onCreationSucceed())
      .onFailure((e) => { console.log(e) })
  }

  create(userId: number, title: string, body: string): void {
    const payload = new SampleCreatePayloadModelImpl(userId, title, body)
    this.asyncProcessHelper.run(payload)
  }

  setCreationSucceedHandler(handler: () => void): void {
    this.onCreationSucceed = handler
  }

  get isAwaiting(): boolean {
    return this.asyncProcessHelper.isAwaitingResponse
  }
}
