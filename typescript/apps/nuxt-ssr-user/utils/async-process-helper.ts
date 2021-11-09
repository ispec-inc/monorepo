import { Subject } from 'rxjs'
import { Maybe } from "~/types/advanced"

type SetErrorMessageFn = (msg: string) => void
type OnSuccessHandler<T> = ((value: T, setErrorMessage: SetErrorMessageFn) => void) | undefined
type OnFailureHandler = ((e: unknown, setErrorMessage: SetErrorMessageFn) => void) | undefined
type OnCompleteHandler = ((setErrorMessage: SetErrorMessageFn) => void) | undefined

export class AsyncProcessHelper<T, U extends unknown[]> {
  private _isAwaitingResponse = false
  private _errorMessage: Maybe<string> = null
  private readonly _errorMessageStream = new Subject<string>()
  private readonly asyncFn: (...args: U) => Promise<T>

  private readonly _onSuccess: OnSuccessHandler<T>
  private readonly _onFailure: OnFailureHandler
  private readonly _onComplete: OnCompleteHandler

  constructor(
    asyncFn: (...args: U) => Promise<T>,
    onSuccess?: OnSuccessHandler<T>,
    onFailure?: OnFailureHandler,
    onComplete?: OnCompleteHandler
  ) {
    this.asyncFn = asyncFn
    this._onSuccess = onSuccess
    this._onFailure = onFailure
    this._onComplete = onComplete
  }

  run(...args: U): Promise<void> {
    this._isAwaitingResponse = true
    this.setErrorMessage(null)

    return this.asyncFn(...args)
      .then((data) => {
        this._onSuccess && this._onSuccess(data, this.setErrorMessage.bind(this))
      })
      .catch((e) => {
        this._onFailure && this._onFailure(e, this.setErrorMessage.bind(this))
      })
      .finally(() => {
        this._isAwaitingResponse = false
        this._onComplete && this._onComplete(this.setErrorMessage.bind(this))
      })
  }

  setErrorMessage(message: Maybe<string>) {
    const msg = message || null
    this._errorMessage = msg

    if (msg !== null) {
      this._errorMessageStream.next(msg)
    }
  }

  onSuccess(handler: OnSuccessHandler<T>): AsyncProcessHelper<T, U> {
    return new AsyncProcessHelper(this.asyncFn, handler, this._onFailure, this._onComplete)
  }

  onFailure(handler: OnFailureHandler): AsyncProcessHelper<T, U> {
    return new AsyncProcessHelper(this.asyncFn, this._onSuccess, handler, this._onComplete)
  }

  onComplete(handler: OnCompleteHandler): AsyncProcessHelper<T, U> {
    return new AsyncProcessHelper(this.asyncFn, this._onSuccess, this._onFailure, handler)
  }

  get isAwaitingResponse(): boolean {
    return this._isAwaitingResponse
  }

  get errorMessage(): Maybe<string> {
    return this._errorMessage
  }

  get errorMessageStream(): Subject<string> {
    return this._errorMessageStream
  }
}
