import { SamplePostModelImpl } from "~/core/model/sample"
import { ISamplePostModel } from "~/core/model/sample/interface"
import { client } from "~/utils/api"

export namespace SampleGateway {
  export async function findAll(): Promise<ISamplePostModel[]> {
    const res = await client.posts.$get()
    return res.map((v) => SamplePostModelImpl.fromApiResponse(v))
  }
}
