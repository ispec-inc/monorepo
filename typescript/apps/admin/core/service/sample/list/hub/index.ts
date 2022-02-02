import { ISampleListGatewayHub } from "./interface";
import { SampleGateway } from "~/core/gateway/sample";
import { ISamplePostModel } from "~/core/model/sample/interface";

export class SampleListGatewayHubImpl implements ISampleListGatewayHub {
  findAll(): Promise<ISamplePostModel[]> {
    return SampleGateway.findAll()
  }
}
