import { ISampleModel } from "~/core-v2/model/sample/interface";

export interface ISampleListGatewayHub {
  findAll(): Promise<ISampleModel[]>
  remove(id: string): Promise<void>
}
