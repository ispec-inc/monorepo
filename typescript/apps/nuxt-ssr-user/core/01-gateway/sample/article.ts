import { cacheSampleArticleModule } from "~/store/cache/sample/article";
import { ResolvedApiResponse } from "~/types/api-response";
import { ApiWithCacheEnabled } from "~/utils/api-with-cache-enabled";

export namespace SampleArticleEndpoint {
  export type Article = {
    id: number
    title: string
    content: string
    author: {
      id: number
      firstName: string
      lastName: string
    }
  }

  export type GetResponse = {
    article: Article
  }

  export type ListResponse = {
    articles: Article[]
  }
}

export interface ISampleArticleGateway {
  findById(id: number): Promise<ResolvedApiResponse<SampleArticleEndpoint.GetResponse>>
  list(): Promise<ResolvedApiResponse<SampleArticleEndpoint.ListResponse>>
}

export class SampleArticleGatewayImpl implements ISampleArticleGateway {
  private findByIdApi: ApiWithCacheEnabled<ResolvedApiResponse<SampleArticleEndpoint.GetResponse>, { id: number }> | null = null

  findById(id: number): Promise<ResolvedApiResponse<SampleArticleEndpoint.GetResponse>> {
    if (this.findByIdApi === null) {
      const endpoint = (payload: { id: number }) => {
        return Promise.resolve({
          data: {
            article: {
              id: payload.id,
              title: 'サンプル',
              content: '内容内容内容',
              author: {
                id: 1,
                firstName: '太郎',
                lastName: 'サンプル'
              }
            }
          }
        })
      }
      this.findByIdApi = new ApiWithCacheEnabled(endpoint, cacheSampleArticleModule)
    }

    return this.findByIdApi.callApi({ id })
  }

  list(): Promise<ResolvedApiResponse<SampleArticleEndpoint.ListResponse>> {
    return Promise.resolve({
      data: {
        articles: [
          {
            id: 1,
            title: 'サンプル',
            content: '内容内容内容',
            author: {
              id: 1,
              firstName: '太郎',
              lastName: 'サンプル'
            }
          }
        ]
      }
    })
  }
}
