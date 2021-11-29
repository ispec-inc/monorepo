import { CONNECTION_ERROR_MESSAGE } from '~/constants/error-message'
import { Stream } from '~/utils/stream'
import { IViewSampleGraphqlModel } from '~/core/00-model/view/view-sample-graphql'
import { Maybe } from '~/types/advanced'
import { IViewSampleGraphqlRepository } from '~/core/02-repository/sample-graphql'
import { ICreateArticleMutateModel } from '~/core/00-model/mutate/article'

export interface IGraphqlPageService {
  fetch(): Promise<void>
  create(mutateModel: ICreateArticleMutateModel): Promise<void>
  viewSampleGraphqlModel: Maybe<IViewSampleGraphqlModel>
}

export class GraphqlPageService implements IGraphqlPageService {
  private readonly sampleGraphqlRepository: IViewSampleGraphqlRepository
  private _postErrorMessage: string | null
  private _isAwaitingResponse: boolean

  readonly loginSuccessEventStream = new Stream<void>()

  constructor(sampleGraphqlRepository: IViewSampleGraphqlRepository) {
    this._postErrorMessage = null
    this._isAwaitingResponse = false
    this.sampleGraphqlRepository = sampleGraphqlRepository
  }

  fetch(): Promise<void> {
    this._postErrorMessage = null
    this._isAwaitingResponse = true
    return this.sampleGraphqlRepository
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

  create(mutateModel: ICreateArticleMutateModel): Promise<void> {
    this._postErrorMessage = null
    this._isAwaitingResponse = true
    return this.sampleGraphqlRepository.create(mutateModel)
  }

  get postErrorMessage(): string | null {
    return this._postErrorMessage
  }

  get isAwaitingResponse(): boolean {
    return this._isAwaitingResponse
  }

  get viewSampleGraphqlModel(): Maybe<IViewSampleGraphqlModel> {
    return this.sampleGraphqlRepository.viewSampleGraphqlModel
  }
}
