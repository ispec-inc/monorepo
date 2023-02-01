import { Maybe } from '~/types/advanced'

interface ApiError {
  code: string
  detail: string
  message: string
}

export class ApiErrorModel {
  readonly code: string
  readonly detail: string
  readonly message: string

  constructor(data: ApiError) {
    this.code = data.code
    this.detail = data.detail
    this.message = data.message
  }

  static isApiError(data: unknown): data is ApiError {
    if (typeof data !== 'object' || data === null) {
      return false
    }

    if (
      typeof (data as Partial<ApiError>).code !== 'string' ||
      typeof (data as Partial<ApiError>).detail !== 'string' ||
      typeof (data as Partial<ApiError>).message !== 'string'
    ) {
      return false
    }

    return true
  }

  static fromUnknown(data: unknown): Maybe<ApiError> {
    if (this.isApiError(data)) {
      return new ApiErrorModel(data)
    }

    return null
  }
}
