import { SamplePostModelImpl } from "~/core/model/domain/sample"
import { SamplePostCommentModelImpl } from "~/core/model/domain/sample/comment"
import { ISampleCreatePayloadModel } from "~/core/model/payload/sample/create"
import { client } from "~/utils/api"

export namespace SampleGateway {
  export async function findAll(): Promise<SamplePostModelImpl[]> {
    const res = await client.posts.$get()
    return res.map((v) => SamplePostModelImpl.fromApiResponse(v))
  }

  export async function find(id: number): Promise<SamplePostModelImpl> {
    const res = await client.posts._id(id).$get()
    return SamplePostModelImpl.fromApiResponse(res)
  }

  export async function create(payload: ISampleCreatePayloadModel): Promise<void> {
    const _ = await client.posts.$post({ body: payload.toObject() }).catch(Promise.reject.bind(Promise))
  }

  export async function findAllComment(id: number): Promise<SamplePostCommentModelImpl[]> {
    const res = await client.posts._id(id).comments.$get()
    return res.map((v) => SamplePostCommentModelImpl.fromApiResponse(v))
  }
}
