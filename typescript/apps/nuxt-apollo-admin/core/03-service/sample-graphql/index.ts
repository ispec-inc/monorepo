import { CONNECTION_ERROR_MESSAGE } from '~/constants/error-message'
import { Stream } from '~/utils/stream'
import { ISampleGraphqlRepository } from '~/core/02-repository/articles'

export interface IGraphqlPageService {
  fetch(): Promise<void>
}

export class GraphqlPageService implements IGraphqlPageService {
  private readonly articlesRepository: ISampleGraphqlRepository
  private _postErrorMessage: string | null
  private _isAwaitingResponse: boolean

  readonly loginSuccessEventStream = new Stream<void>()

  constructor(articlesRepository: ISampleGraphqlRepository) {
    this._postErrorMessage = null
    this._isAwaitingResponse = false
    this.articlesRepository = articlesRepository
  }

  fetch(): Promise<void> {
    this._postErrorMessage = null
    this._isAwaitingResponse = true
    return this.articlesRepository
      .fetch()
      // .then((res: unknown) => {
      .then(() => {
        // if ('error' in res) {
        //   this._postErrorMessage = res.error.message || null
        //   return
        // }

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
