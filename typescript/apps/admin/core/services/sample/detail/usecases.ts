import { SampleGateway } from "~/core/gateways/sample";
import { ISamplePostModel } from "~/core/models/domain/sample";
import { ISamplePostCommentModel } from "~/core/models/domain/sample/comment";

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
