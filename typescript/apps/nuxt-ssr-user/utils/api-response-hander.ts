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

export type ResolvedResponseBasedOperation<T> = (
  response: ResolvedApiResponse<T>
) => void

export const resolvedResponseBasedOperation = <T>(
  onNext: (data: T) => void,
  onError: (err: ApiErrorModel) => void
) => {
  return (response: ResolvedApiResponse<T>) => {
    if ('error' in response) {
      onError(response.error)
      return
    }

    onNext(response.data)
  }
}
