import { ApiErrorModel } from '~/core/00-model/api-error'

interface IResolvedApiResponse<T> {
  data: T
  error: ApiErrorModel
}

export type ResolvedApiResponse<T> =
  | Pick<IResolvedApiResponse<T>, 'data'>
  | Pick<IResolvedApiResponse<T>, 'error'>
export type ResolvedApiResponseDataType<
  T extends ResolvedApiResponse<unknown>
> = T extends ResolvedApiResponse<infer R> ? R : never
