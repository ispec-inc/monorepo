import {
  LoginRequest,
  LoginResponse,
} from '@monorepo/proto/admin/api/rest/v1/auth/auth_pb'
import { IAuthGateway } from '../00-interface/gateway/auth'
import { ResolvedApiResponse } from '~/types/api-response'
import { ApiRequestHelper } from '~/utils/api-request-helper'
import { apiErrorHandler } from '~/utils/api-error-handler'

export class AuthGatewayImpl implements IAuthGateway {
  private readonly postAuthLogin: ApiRequestHelper.WithBodyRequest

  constructor() {
    this.postAuthLogin = ApiRequestHelper.request(
      ApiRequestHelper.ApiBaseUrl.Admin
    )('/admin/login').post()
  }

  login(
    email: string,
    password: string
  ): Promise<ResolvedApiResponse<LoginResponse.AsObject>> {
    return new Promise<ResolvedApiResponse<LoginResponse.AsObject>>(
      (resolve, reject) => {
        const requestBody: LoginRequest.AsObject = { email, password }
        this.postAuthLogin<LoginResponse.AsObject, LoginRequest.AsObject>(
          requestBody
        )
          .then((res) => {
            resolve({ data: res.data })
          })
          .catch(apiErrorHandler(resolve, reject))
      }
    )
  }
}
