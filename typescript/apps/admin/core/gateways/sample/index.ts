import { SamplePostModelImpl } from "~/core/models/domain/sample"
import { SamplePostCommentModelImpl } from "~/core/models/domain/sample/comment"
import { ISampleCreatePayloadModel } from "~/core/models/payload/sample/create"
import { ISampleUpdatePayloadModel } from "~/core/models/payload/sample/update"
import { client } from "~/utils/api"

export namespace SampleGateway {
  export async function findAll(): Promise<SamplePostModelImpl[]> {
    const res = await client.posts.$get().catch(Promise.reject.bind(Promise))
    return res.map((v) => SamplePostModelImpl.fromApiResponse(v))
  }

  export async function find(id: number): Promise<SamplePostModelImpl> {
    const res = await client.posts._id(id).$get().catch(Promise.reject.bind(Promise))
    return SamplePostModelImpl.fromApiResponse(res)
  }

  export async function create(payload: ISampleCreatePayloadModel): Promise<void> {
    const _ = await client.posts.$post({ body: payload.toObject() }).catch(Promise.reject.bind(Promise))
  }

  export async function update(id: number, payload: ISampleUpdatePayloadModel): Promise<void> {
    const _ = await client.posts._id(id).$patch({ body: payload.toObject() }).catch(Promise.reject.bind(Promise))
  }

  export async function findAllComment(id: number): Promise<SamplePostCommentModelImpl[]> {
    const res = await client.posts._id(id).comments.$get().catch(Promise.reject.bind(Promise))
    return res.map((v) => SamplePostCommentModelImpl.fromApiResponse(v))
  }
}
