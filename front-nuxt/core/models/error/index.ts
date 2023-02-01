import { ApolloError, isApolloError } from '@apollo/client/core'
import { ErrorModelHelper } from './helper'
import { Maybe } from '~/types/advanced'
import { UNKNOWN_ERROR_MESSAGE } from '~/constants/error-message'

export default class ErrorModel {
  private apolloError?: ApolloError
  private error?: Error
  private _message?: string
  private _statusCode?: number

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(error: any) {
    if (typeof error === 'string') {
      this.error = new Error(error)

    } else if (typeof error === 'number') {
      this._statusCode = error

    } else if (isApolloError(error)) {
      this.apolloError = error

    } else if (error instanceof Error) {
      this.error = error

    } else {
      this._statusCode = error.statusCode ?? null
      this._message = error.message ?? null

    }
  }

  get message(): string {
    const messageFromStatusCode = this._statusCode
      ? ErrorModelHelper.statusCode2JpMessage(this._statusCode)
      : null

    return this.apolloError?.message
      ?? this.error?.message
      ?? this._message
      ?? messageFromStatusCode
      ?? UNKNOWN_ERROR_MESSAGE
  }

  get statusCode(): Maybe<number> {
    return this._statusCode ?? null

  }
}
