import { ServiceBase } from "~/core/service/_base";
import { ISampleListGatewayHub } from "~/core/service/sample/list/hub/interface";
import { ISamplePostModel } from "~/core/model/sample/interface";

export class SampleListPageService extends ServiceBase<ISampleListGatewayHub> {
  private _posts: ISamplePostModel[] = []

  constructor(gateway: ISampleListGatewayHub) {
    super(gateway)
  }

  async fetch(): Promise<void> {
    this._posts = await this.gatewayHub.findAll()
  }

  get slicedPosts(): ISamplePostModel[] {
    return this._posts.slice(0, 10)
  }
}
