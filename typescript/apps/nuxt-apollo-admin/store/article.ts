import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import { store } from '@/store'
import { $axios } from '@/utils/api'

/**
 * In the case of BFFs, the API is tied to the Page, so the response's interface is defined in Store and the model that be used in interface is called from /models.
 * If not, the response is defined in models.
 * BFFの場合はAPIとPageが紐づくため、Storeでresponseのinterfaceを定義し、modelsからmodelを呼び出して使う。
 * そうでない場合は、レスポンスはmodelsで定義
*/

export interface SampleResponseState {
  articles: unknown[]
}

@Module({ name: 'article', dynamic: true, store, namespaced: true })
export class ArticleModule extends VuexModule {
  private sampleState: SampleResponseState | null = null

  @Mutation
  SET_ARTICLES(value: SampleResponseState): void {
    this.sampleState = value
  }

  @Action({ rawError: true })
  fetch(): void {
    $axios.get<SampleResponseState>('/admin/v1/sample-graphql').then((response) => {
      const { data } = response
      this.SET_ARTICLES(data)
    })
  }

  get articles(): unknown[] {
    return this.sampleState?.articles ?? []
  }
}

const articleModule = getModule(ArticleModule)
export default articleModule
