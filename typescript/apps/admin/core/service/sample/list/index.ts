import { ISampleListUsecases } from "./usecases";
import { ServiceBase } from "~/core/service/_base";
import { ISamplePostModel } from "~/core/model/sample/interface";

export class SampleListPageService extends ServiceBase<ISampleListUsecases> {
  private _posts: ISamplePostModel[] = []

  async fetch(): Promise<void> {
    this._posts = await this.usecases.findAll()
  }

  get slicedPosts(): ISamplePostModel[] {
    return this._posts.slice(0, 10)
  }
}
