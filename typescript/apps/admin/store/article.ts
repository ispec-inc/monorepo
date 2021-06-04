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
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb"
import {types} from "node-sass";

@Module({ name: 'article', dynamic: true, store, namespaced: true })
export class ArticleModule extends VuexModule {
  private getRequest: GetRequest = new GetRequest()
  private getResponse: GetResponse = new GetResponse()
  private listResponse: ListResponse = new ListResponse()

  @Mutation
  SET_ARTICLES(value: { articles: Array<Article.AsObject> }): void {
    const articles = value.articles.map((article: Article.AsObject) => {
      const articleInstance = new Article()
      const createdAt: Timestamp | undefined = article.createdAt ? new Timestamp() : undefined
      const updatedAt: Timestamp | undefined = article.updatedAt ? new Timestamp() : undefined
      if (createdAt) {
        createdAt.setSeconds(article.createdAt!.seconds)
        createdAt.setNanos(article.createdAt!.nanos)
      }
      if (updatedAt) {
        updatedAt.setSeconds(article.updatedAt!.seconds)
        updatedAt.setNanos(article.updatedAt!.nanos)
      }

      articleInstance.setId(article.id)
      articleInstance.setTitle(article.title)
      articleInstance.setBody(article.body)
      articleInstance.setCreatedAt(createdAt)
      articleInstance.setUpdatedAt(updatedAt)
      return articleInstance
    })
    const listResponse = new ListResponse()
    listResponse.setArticlesList(articles)

    this.listResponse = listResponse
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
