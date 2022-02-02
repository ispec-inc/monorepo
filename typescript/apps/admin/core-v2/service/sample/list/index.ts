import { ServiceBase } from "~/core-v2/service/_base";
import { ISampleListGatewayHub } from "~/core-v2/service/sample/list/hub/interface";

export class SampleListService extends ServiceBase<ISampleListGatewayHub> {
  fetch(): void {
    this.gatewayHub.findAll()
  }

  remove(id: string): void {
    this.gatewayHub.remove(id)
  }
}
