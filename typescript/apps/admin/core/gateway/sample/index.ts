import { SamplePostModelImpl } from "~/core/model/sample"
import { client } from "~/utils/api"

export namespace SampleGateway {
  export async function findAll(): Promise<SamplePostModelImpl[]> {
    const res = await client.posts.$get()
    return res.map((v) => SamplePostModelImpl.fromApiResponse(v))
  }
}
