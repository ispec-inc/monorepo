import { useApolloClient } from '@apollo/client'
import { ApiRequestHelper } from '~/utils/api-request-helper'
import { ArticlesResponse } from '~/types/response/articles'
import getArticles from '@/types/response/articles/query.gql'

export interface IArticlesGateway {
    fetch(): Promise<ArticlesResponse>
}

export class ArticlesGatewayImpl implements IArticlesGateway {
  private readonly postAuthLogin: ApiRequestHelper.WithBodyRequest

  constructor() {
    this.postAuthLogin = ApiRequestHelper.request(
      ApiRequestHelper.ApiBaseUrl.Admin
    )('/admin/login').post()
  }

  fetch(): Promise<ArticlesResponse> {
    return useApolloClient().query<ArticlesResponse>({
      query: getArticles
    }).then((res) => {
      return res.data
    })
    // return new Promise<ArticlesResponse>(
    //   (resolve, reject) => {
    //     this.postAuthLogin<LoginResponse.AsObject, LoginRequest.AsObject>(
    //       requestBody
    //     )
    //       .then((res) => {
    //         resolve({ data: res.data })
    //       })
    //       .catch(apiErrorHandler(resolve, reject))
    //   }
    // )
  }
}
