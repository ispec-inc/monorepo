import { ApiErrorModel } from '~/core/00-model/api-error'
import { ResolvedApiResponse } from '~/types/api-response'

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
