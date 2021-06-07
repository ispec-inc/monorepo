import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import { store } from '@/store'
import { $axios } from '@/utils/api'
import { SampleInterface } from '@/models/sample'

// BFFの場合はAPIとPageが紐づくため、Storeでresponseのinterfaceを定義し、modelsからmodelを呼び出して使う。
// そうでない場合は、レスポンスはmodelsで定義
export interface SampleResponseState {
  articles: Array<SampleInterface>
}

@Module({ name: 'article', dynamic: true, store, namespaced: true })
export class ArticleModule extends VuexModule {
  private sampleState: SampleResponseState | null = null

  @Mutation
  SET_ARTICLES(value: SampleResponseState): void {
    this.sampleState = value
  }

  @Action({rawError: true})
  fetch() {
    $axios.get<SampleResponseState>('/v1/articles').then((response) => {
      const { data } = response
      this.SET_ARTICLES(data)

    })
  }

  get articles(): Array<SampleInterface> {
    return this.sampleState?.articles ?? []
  }

}

const articleModule = getModule(ArticleModule)
export default articleModule
