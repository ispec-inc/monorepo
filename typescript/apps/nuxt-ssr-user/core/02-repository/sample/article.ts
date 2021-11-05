import { SampleArticleModel } from "~/core/00-model/sample/artice";
import { ISampleArticleGateway } from "~/core/01-gateway/sample/article";
import { Maybe } from "~/types/advanced";
import { ResolvedApiResponse, ResolvedApiResponseDataType } from "~/types/api-response";
import { resolvedResponseBasedOperation } from "~/utils/api-response-hander";

export interface ISampleArticleRepository {
  findById(id: number): Promise<ResolvedApiResponse<void>>
  list(): Promise<ResolvedApiResponse<void>>
  readonly article: Maybe<SampleArticleModel>
  readonly articleList: Maybe<SampleArticleModel[]>
}

export class SampleArticleRepositoryImpl implements ISampleArticleRepository {
  private readonly gateway: ISampleArticleGateway

  private _article: Maybe<SampleArticleModel> = null
  private _articleList: Maybe<SampleArticleModel[]> = null

  constructor(gateway: ISampleArticleGateway) {
    this.gateway = gateway
  }

  findById(id: number): Promise<ResolvedApiResponse<void>> {
    return new Promise((resolve, reject) => {
      this.gateway.findById(id)
        .then((res) => {
          resolvedResponseBasedOperation<ResolvedApiResponseDataType<typeof res>>(
            (data) => {
              this._article = SampleArticleModel.fromApiResponse(data.article)
              resolve({ data: undefined })
            },
            (error) => resolve({ error })
          )(res)
        })
        .catch(reject)
    })
  }

  list(): Promise<ResolvedApiResponse<void>> {
    return new Promise((resolve, reject) => {
      this.gateway.list()
        .then((res) => {
          resolvedResponseBasedOperation<ResolvedApiResponseDataType<typeof res>>(
            (data) => {
              this._articleList = data.articles.map((a) => SampleArticleModel.fromApiResponse(a))
              resolve({ data: undefined })
            },
            (error) => resolve({ error })
          )(res)
        })
        .catch(reject)
    })
  }

  get article(): Maybe<SampleArticleModel> {
    return this._article
  }

  get articleList(): Maybe<SampleArticleModel[]> {
    return this._articleList
  }
}
