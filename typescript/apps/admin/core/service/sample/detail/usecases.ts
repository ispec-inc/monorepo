import { SampleGateway } from "~/core/gateway/sample";
import { ISamplePostModel } from "~/core/model/domain/sample";
import { ISamplePostCommentModel } from "~/core/model/domain/sample/comment";

export interface ISampleDetailPageUsecases {
  fetch(id: number): Promise<ISamplePostModel>
  fetchComments(id: number): Promise<ISamplePostCommentModel[]>
}

export class SampleDetailPageUsecaseImpl implements ISampleDetailPageUsecases {
  fetch(id: number): Promise<ISamplePostModel> {
    return SampleGateway.find(id)
  }

  fetchComments(id: number): Promise<ISamplePostCommentModel[]> {
    return SampleGateway.findAllComment(id)
  }
}
