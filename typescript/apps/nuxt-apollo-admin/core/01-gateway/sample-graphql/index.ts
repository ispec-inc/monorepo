// import { useApolloClient } from '@apollo/client'
import ApolloClient from 'apollo-boost'
import { ArticlesResponse } from '~/types/response/articles'
import getArticles from '~/types/response/articles/query.gql'

export interface IViewSampleGraphqlGateway {
  fetch(): Promise<ArticlesResponse>
}

export class ViewSampleGraphqlGatewayImpl implements IViewSampleGraphqlGateway {
  fetch(): Promise<ArticlesResponse> {
    const apolloClient = new ApolloClient({
      uri: 'http://localhost:9000/graphql'
    })
    return apolloClient
      .query<ArticlesResponse>({
        query: getArticles
      })
      .then((res) => {
        return res.data
      })
  }
}
