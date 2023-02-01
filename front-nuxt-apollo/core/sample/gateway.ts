import { cacheSampleModule } from "~/store/cache/sample"
import { ApiWithCacheEnabled } from "~/utils/api-with-cache-enabled"

export class SampleGatewayImpl {
  private readonly api: ApiWithCacheEnabled<{ title: string, author: string, content: string }, { id: number }>

  constructor() {
    const endpoint = (payload: { id: number }): Promise<{ title: string, author: string, content: string }> => {
      console.log('payload', payload)
      return Promise.resolve({
        title: `article ${payload.id}`,
        author: 'sample author',
        content: 'sample'
      })
    }
    this.api = new ApiWithCacheEnabled(endpoint, cacheSampleModule)
  }

  fetchById(id: number): Promise<{ title: string, author: string, content: string }> {
    return this.api.callApi({ id })
  }
}
