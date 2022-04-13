import { ApolloError, isApolloError } from '@apollo/client/core'
import { Maybe } from '~/types/advanced'

export class ApiErrorModel {
  readonly err: ApolloError

  constructor(data: ApolloError) {
    this.err = data
  }

  static isApiError(data: Error): data is ApolloError {
    return isApolloError(data)
  }

  static fromError(data: Error): Maybe<ApiErrorModel> {
    if (this.isApiError(data)) {
      return new ApiErrorModel(data)
    }

    return null
  }
}
