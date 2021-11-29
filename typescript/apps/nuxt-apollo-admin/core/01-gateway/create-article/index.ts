import createArticle from '~/types/request/create-article/mutation.gql'
import { ICreateArticleMutateModel } from '~/core/00-model/mutate/article'
import { CreateArticleResponse } from '~/types/response/create-article'
import { apollo } from '~/utils/apollo'

export interface ICreateArticleGateway {
  mutate(mutateModel: ICreateArticleMutateModel): Promise<CreateArticleResponse>
}

export class CreateArticleGatewayImpl implements ICreateArticleGateway {
  mutate(mutateModel: ICreateArticleMutateModel): Promise<CreateArticleResponse> {
    return apollo
      .mutate<CreateArticleResponse>({
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
