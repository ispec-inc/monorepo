import { ResolvedApiResponse } from "~/types/api-response";

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
  findById(id: number): Promise<ResolvedApiResponse<SampleArticleEndpoint.GetResponse>> {
    return Promise.resolve({
      data: {
        article: {
          id,
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
