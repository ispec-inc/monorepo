import { useApolloClient } from '@apollo/client'
import { ArticlesResponse } from '~/types/response/articles'
import getArticles from '@/types/response/articles/query.gql'
import { ICreateArticleMutateModel } from '~/core/00-model/mutate/article'

export interface ICreateArticleGateway {
  mutate(mutateModel: ICreateArticleMutateModel): Promise<ArticlesResponse>
}

export class CreateArticleGatewayImpl implements ICreateArticleGateway {
  mutate(mutateModel: ICreateArticleMutateModel): Promise<ArticlesResponse> {
    return useApolloClient().mutate<ArticlesResponse>({
      mutation: getArticles,
      variables: mutateModel.variables
    }).then((res) => {
      if (!res.data) { throw new Error('error') }
      return res.data
    })
  }
}
