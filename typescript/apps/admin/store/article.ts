import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import {GetRequest, GetResponse, ListResponse} from '@monorepo/gen/admin/api/rest/article/article_pb'
import { store } from '@/store'
import { $axios } from '@/utils/api'
import { Article } from "@monorepo/gen/admin/view/article_pb"

@Module({ name: 'article', dynamic: true, store, namespaced: true })
export class ArticleModule extends VuexModule {
  private getRequest: GetRequest = new GetRequest()
  private getResponse: GetResponse = new GetResponse()
  private listResponse: ListResponse = new ListResponse()

  @Mutation
  SET_ARTICLES(value: { articles: Array<Article.AsObject> }): void {
    // in progress
  }

  @Action({rawError: true})
  fetch() {
    $axios.get<{ articles: Array<Article.AsObject> }>('/v1/articles').then((response) => {
      const { data } = response
      this.SET_ARTICLES(data)

    })
  }

  get articles() {
    return this.listResponse.toObject(true).articlesList
  }

}

const articleModule = getModule(ArticleModule)
export default articleModule
