import { IAuthRepository } from '../00-interface/repository/auth'
import { CONNECTION_ERROR_MESSAGE } from '~/constants/error-message'
import { Stream } from '~/utils/stream'

export class LoginPageService {
  private readonly authRepository: IAuthRepository
  private _postErrorMessage: string | null
  private _isAwaitingResponse: boolean

  readonly loginSuccessEventStream = new Stream<void>()

  constructor(authRepository: IAuthRepository) {
    this._postErrorMessage = null
    this._isAwaitingResponse = false
    this.authRepository = authRepository
  }

  submit(email: string, password: string): void {
    this._postErrorMessage = null
    this._isAwaitingResponse = true

    this.authRepository
      .login(email, password)
      .then((res) => {
        if ('error' in res) {
          this._postErrorMessage = res.error.message || null
          return
        }

        this.loginSuccessEventStream.next()
      })
      .catch(() => {
        this._postErrorMessage = CONNECTION_ERROR_MESSAGE
      })
      .finally(() => {
        this._isAwaitingResponse = false
      })
  }

  get postErrorMessage(): string | null {
    return this._postErrorMessage
  }

  get isAwaitingResponse(): boolean {
    return this._isAwaitingResponse
  }
}
