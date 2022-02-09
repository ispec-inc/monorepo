import { Stream } from './stream'
import { Maybe } from "~/types/advanced"

export class AsyncProcessHelper<T, U extends unknown[]> {
  private _isAwaitingResponse = false
  private _errorMessage: Maybe<string> = null
  private readonly _errorMessageStream = new Stream<string>()
  private readonly asyncFn: (...args: U) => Promise<T>

  constructor(asyncFn: (...args: U) => Promise<T>) {
    this.asyncFn = asyncFn
  }

  run(...args: U): Promise<T> {
    this._isAwaitingResponse = true
    this.setErrorMessage(null)

    return this.asyncFn(...args)
      .finally(() => {
        this._isAwaitingResponse = false
      })
  }

  setErrorMessage(message: Maybe<string>): void {
    const msg = message || null
    this._errorMessage = msg

    if (msg !== null) {
      this._errorMessageStream.next(msg)
    }
  }

  get isAwaitingResponse(): boolean {
    return this._isAwaitingResponse
  }

  get errorMessage(): Maybe<string> {
    return this._errorMessage
  }

  get errorMessageStream(): Stream<string> {
    return this._errorMessageStream
  }
}
