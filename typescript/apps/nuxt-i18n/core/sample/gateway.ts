import { cacheSampleModule } from "~/store/cache/sample"
import { SampleGetRequest } from "~/types/request/sample/get"
import { SampleGetResponse } from "~/types/response/sample/get"
import { ApiWithCacheEnabled } from "~/utils/api-with-cache-enabled"

export class SampleGatewayImpl {
  private readonly api: ApiWithCacheEnabled<SampleGetResponse, SampleGetRequest>

  constructor() {
    const endpoint = (payload: { id: number }): Promise<SampleGetResponse> => {
      console.log('payload', payload)
      return Promise.resolve({
        title: `article ${payload.id}`,
        author: 'sample author',
        content: 'sample'
      })
    }
    this.api = new ApiWithCacheEnabled(endpoint, cacheSampleModule)
  }

  fetchById(id: number): Promise<SampleGetResponse> {
    return this.api.callApi({ id })
  }
}
