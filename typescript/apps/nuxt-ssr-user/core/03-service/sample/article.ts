import { Subject } from 'rxjs'
import { SampleArticleModel } from '~/core/00-model/sample/artice';
import { ISampleArticleRepository } from "~/core/02-repository/sample/article";
import { ResolvedApiResponse } from "~/types/api-response";
import { AsyncProcessHelper } from "~/utils/async-process-helper";

type FetchHelper = AsyncProcessHelper<ResolvedApiResponse<void>, Parameters<ISampleArticleRepository['list']>>

export class SampleArticleIndexPageService {
  private readonly repository: ISampleArticleRepository
  private readonly fetchHelper: FetchHelper

  constructor(repository: ISampleArticleRepository) {
    this.repository = repository
    this.fetchHelper = this.constructFetchHelper()
  }

  fetch(): Promise<void> {
    return this.fetchHelper.run()
  }

  fetchById(id: number) {
    this.repository.findById(id)
  }

  private constructFetchHelper(): FetchHelper {
    return new AsyncProcessHelper(this.repository.list.bind(this.repository))
      .onSuccess((res, setError) => {
        if ('error' in res && res.error.message) {
          setError(res.error.message)
        }
      })
      .onFailure((_, setError) => {
        setError('通信時にエラーが発生しました')
      })
  }

  get isAwaitingResponse(): boolean {
    return this.fetchHelper.isAwaitingResponse
  }

  get errorMessageStream(): Subject<string> {
    return this.fetchHelper.errorMessageStream
  }

  get articles(): SampleArticleModel[] {
    return this.repository.articleList || []
  }
}
