import type { ApolloQueryResult } from '@apollo/client'
import { ArticlesResponse } from '~/types/response/articles'
import getArticles from '~/types/response/articles/query.gql'
import { apollo } from '~/utils/apollo'

export interface IViewSampleGraphqlGateway {
  fetch(): Promise<ArticlesResponse>
}

export class ViewSampleGraphqlGatewayImpl implements IViewSampleGraphqlGateway {
  fetch(): Promise<ArticlesResponse> {
    return apollo
      .query<ArticlesResponse>({
        query: getArticles
      })
      .then((res: ApolloQueryResult<ArticlesResponse>) => {
        return res.data
      })
  }
}
