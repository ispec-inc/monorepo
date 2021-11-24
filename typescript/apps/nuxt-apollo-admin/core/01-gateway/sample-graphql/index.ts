import { useApolloClient } from '@apollo/client'
import { ArticlesResponse } from '~/types/response/articles'
import getArticles from '@/types/response/articles/query.gql'

export interface IViewSampleGraphqlGateway {
    fetch(): Promise<ArticlesResponse>
}

export class ViewSampleGraphqlGatewayImpl implements IViewSampleGraphqlGateway {
  fetch(): Promise<ArticlesResponse> {
    return useApolloClient().query<ArticlesResponse>({
      query: getArticles
    }).then((res) => {
      return res.data
    })
  }
}
