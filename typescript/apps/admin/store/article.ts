import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import { GetRequest } from '@monorepo/gen/admin/api/rest/article/article_pb'
import { store } from '@/store'
import { $axios } from '@/utils/api'


@Module({ name: 'article', dynamic: true, store, namespaced: true })
export class ArticleModule extends VuexModule {
  private _articles: GetRequest = new GetRequest()

  @Mutation
  SET_ARTICLES(value: GetRequest) {
    this._articles = value
  }

  @Action({rawError: true})
  fetch() {
    console.debug(this._articles)
    $axios.get<any>('/v1/articles').then((response) => {
      console.debug(response)
    })
  }

  get articles(): GetRequest {
    return this._articles
  }

}

const articleModule = getModule(ArticleModule)
export default articleModule
