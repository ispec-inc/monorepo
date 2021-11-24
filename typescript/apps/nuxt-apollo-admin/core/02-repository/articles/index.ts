import { ViewSampleGraphqlModel } from '~/core/00-model/view/view-sample-graphql'
import { Maybe } from '~/types/advanced'
import { IViewSampleGraphqlGateway } from '~/core/01-gateway/sample-graphql'
import { ICreateArticleGateway } from '~/core/01-gateway/create-article'
import { ICreateArticleMutateModel } from '~/core/00-model/mutate/article'

export interface IViewSampleGraphqlRepository {
  fetch(): Promise<void>
  create(mutateModel: ICreateArticleMutateModel): Promise<void>
  viewSampleGraphqlModel: Maybe<ViewSampleGraphqlModel>
}

export class ViewSampleGraphqlRepositoryImpl implements IViewSampleGraphqlRepository {
  private readonly queryGateway: IViewSampleGraphqlGateway
  private readonly mutateGateway: ICreateArticleGateway
  private readonly _viewSampleGraphqlModel: Maybe<ViewSampleGraphqlModel> = null

  constructor(queryGateway: IViewSampleGraphqlGateway, mutateGateway: ICreateArticleGateway) {
    this.queryGateway = queryGateway
    this.mutateGateway = mutateGateway
  }

  fetch(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.queryGateway
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

  create(mutateModel: ICreateArticleMutateModel): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.mutateGateway
        .mutate(mutateModel)
        .then(() => {
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get viewSampleGraphqlModel(): Maybe<ViewSampleGraphqlModel> {
    return this._viewSampleGraphqlModel
  }
}
