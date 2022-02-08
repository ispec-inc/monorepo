import { SamplePostModelImpl } from "~/core/model/sample"
import { SamplePostCommentModelImpl } from "~/core/model/sample/comment"
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

  export async function findAllComment(id: number): Promise<SamplePostCommentModelImpl[]> {
    const res = await client.posts._id(id).comments.$get()
    return res.map((v) => SamplePostCommentModelImpl.fromApiResponse(v))
  }
}
