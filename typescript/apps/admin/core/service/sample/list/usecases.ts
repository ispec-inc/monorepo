import { SampleGateway } from "~/core/gateway/sample";
import { ISamplePostModel } from "~/core/model/domain/sample";

export interface ISampleListUsecases {
  findAll(): Promise<ISamplePostModel[]>
}


export class SampleListUsecaseImpl implements ISampleListUsecases {
  findAll(): Promise<ISamplePostModel[]> {
    return SampleGateway.findAll()
  }
}
