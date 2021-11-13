import { ResolvedApiResponse } from '~/types/api-response'

export interface IAuthRepository {
  login(email: string, password: string): Promise<ResolvedApiResponse<void>>
  logout(): void
}
