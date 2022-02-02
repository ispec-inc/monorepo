import { ISampleListGatewayHub } from "./interface";
import { SampleGateway } from "~/core-v2/gateway/sample";
import { SampleModelImpl } from "~/core-v2/model/sample";

export class SampleListGatewayHubImpl implements ISampleListGatewayHub {
  findAll(): Promise<SampleModelImpl[]> {
    return SampleGateway.findAll()
  }

  remove(id: string): Promise<void> {
    return SampleGateway.remove(id)
  }
}
