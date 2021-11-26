import ApolloClient from 'apollo-boost'
import { ArticleResponse } from '~/types/response/articles/mono'
import createArticle from '~/types/request/create-article/mutation.gql'
import { ICreateArticleMutateModel } from '~/core/00-model/mutate/article'

export interface ICreateArticleGateway {
  mutate(mutateModel: ICreateArticleMutateModel): Promise<ArticleResponse>
}

export class CreateArticleGatewayImpl implements ICreateArticleGateway {
  mutate(mutateModel: ICreateArticleMutateModel): Promise<ArticleResponse> {
    const apolloClient = new ApolloClient({
      uri: 'http://localhost:9000/graphql'
    })
    return apolloClient
      .mutate<ArticleResponse>({
        mutation: createArticle,
        variables: mutateModel.variables
      })
      .then((res) => {
        if (!res.data) {
          throw new Error('error')
        }
        return res.data
      })
  }
}
