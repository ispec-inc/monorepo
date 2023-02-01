import { LoginResponse } from '@monorepo/proto/admin/api/rest/v1/auth/auth_pb'
import { IAuthGateway } from '../00-interface/gateway/auth'
import { IAuthRepository } from '../00-interface/repository/auth'
import { authTokenModule } from '~/store/auth-token'
import { ResolvedApiResponse } from '~/types/api-response'
import {
  ResolvedResponseBasedOperation,
  resolvedResponseBasedOperation,
} from '~/utils/resolved-response-based-operation'
import { PromiseType } from '~/types/promise'

export class AuthRepositoryImpl implements IAuthRepository {
  private readonly gateway: IAuthGateway
  private readonly authResponseHandlerConstructor: (
    resolve: PromiseType.Resolve<ResolvedApiResponse<void>>
  ) => ResolvedResponseBasedOperation<LoginResponse.AsObject>

  constructor(gateway: IAuthGateway) {
    this.gateway = gateway
    this.authResponseHandlerConstructor = (
      resolve: PromiseType.Resolve<ResolvedApiResponse<void>>
    ) => {
      return resolvedResponseBasedOperation<LoginResponse.AsObject>(
        (data) => {
          if (data.auth === undefined) {
            throw new Error('auth is undefined')
          }

          authTokenModule.setToken(data.auth)
          resolve({ data: undefined })
        },
        (error) => {
          resolve({ error })
        }
      )
    }
  }

  login(email: string, password: string): Promise<ResolvedApiResponse<void>> {
    return new Promise<ResolvedApiResponse<void>>((resolve, reject) => {
      this.gateway
        .login(email, password)
        .then((res) => {
          const handler = this.authResponseHandlerConstructor(resolve)
          handler(res)
        })
        .catch(reject)
    })
  }

  logout(): void {
    authTokenModule.clearToken()
  }
}
