import { SampleGateway } from "~/core/gateways/sample";
import { ISamplePostModel } from "~/core/models/domain/sample";

export interface ISampleListUsecases {
  findAll(): Promise<ISamplePostModel[]>
}


export class SampleListUsecaseImpl implements ISampleListUsecases {
  findAll(): Promise<ISamplePostModel[]> {
    return SampleGateway.findAll()
  }
}
