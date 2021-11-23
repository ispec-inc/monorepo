import { IArticlesGateway } from '~/core/01-gateway/articles'
import { ViewSampleGraphqlModel } from '~/core/00-model/view/view-sample-graphql'
import { Maybe } from '~/types/advanced'

export interface ISampleGraphqlRepository {
  fetch(): Promise<void>
}

export class SampleGraphqlRepositoryImpl implements ISampleGraphqlRepository {
  private readonly gateway: IArticlesGateway
  private readonly _ViewSampleGraphqlModel: Maybe<ViewSampleGraphqlModel> = null

  constructor(gateway: IArticlesGateway) {
    this.gateway = gateway
  }

  fetch(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.gateway
        .fetch()
        .then(() => {
          // this._ViewSampleGraphqlModels =
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
