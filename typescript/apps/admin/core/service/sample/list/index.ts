import { ServiceBase } from "~/core/service/_base";
import { ISampleListGatewayHub } from "~/core/service/sample/list/hub/interface";
import { ISamplePostModel } from "~/core/model/sample/interface";

export class SampleListPageService extends ServiceBase<ISampleListGatewayHub> {
  private _posts: ISamplePostModel[] = []

  async fetch(): Promise<void> {
    this._posts = await this.gatewayHub.findAll()
  }

  get filteredPosts(): ISamplePostModel[] {
    return this._posts.slice(0, 10)
  }
}
