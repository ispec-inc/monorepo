import { ApiErrorModel } from '~/core/00-model/api-error'
import { ResolvedApiResponse } from '~/types/api-response'
import { PromiseType } from '~/types/promise'

export function apiErrorHandler<T>(
  resolve: PromiseType.Resolve<ResolvedApiResponse<T>>,
  reject: PromiseType.Reject
) {
  return (e?: unknown) => {
    const em = ApiErrorModel.fromUnknown(e)

    em ? resolve({ error: em }) : reject(e)
  }
}
