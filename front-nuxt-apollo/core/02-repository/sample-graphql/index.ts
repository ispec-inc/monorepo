import { IViewSampleGraphqlModel, ViewSampleGraphqlModel } from '~/core/00-model/view/view-sample-graphql'
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
  private _viewSampleGraphqlModel: Maybe<IViewSampleGraphqlModel> = null
  // 必要に応じてvuexに保存する

  /**
   * @param queryGateway viewSampleGraphqlModelを取得できるquery gateway
   * @param mutateGateway viewSampleGraphqlModelを作成できるmutation gateway
   */

  constructor(queryGateway: IViewSampleGraphqlGateway, mutateGateway: ICreateArticleGateway) {
    this.queryGateway = queryGateway
    this.mutateGateway = mutateGateway
  }

  fetch(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.queryGateway
        .fetch()
        .then((response) => {
          this._viewSampleGraphqlModel = new ViewSampleGraphqlModel(response)
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
        .then((response) => {
          const data = this._viewSampleGraphqlModel?.rawData ?? {
            articles: []
          }
          data?.articles.push(response.createArticle)
          this._viewSampleGraphqlModel = new ViewSampleGraphqlModel(
            data
          )
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
