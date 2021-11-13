import {
  LoginResponse,
} from '@monorepo/proto/admin/api/rest/v1/auth/auth_pb'
import { ResolvedApiResponse } from '~/types/api-response'

export interface IAuthGateway {
  login(
    email: string,
    password: string
  ): Promise<ResolvedApiResponse<LoginResponse.AsObject>>
}
