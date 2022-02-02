import { ISamplePostModel } from "~/core/model/sample/interface";

export interface ISampleListGatewayHub {
  findAll(): Promise<ISamplePostModel[]>
}
