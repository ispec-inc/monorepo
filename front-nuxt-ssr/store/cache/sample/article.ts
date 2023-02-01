import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import { store } from '@/store'
import { ApiResponseCache, CacheModule } from '~/utils/api-with-cache-enabled'
import { SampleArticleEndpoint } from '~/core/01-gateway/sample/article'
import { ResolvedApiResponse } from '~/types/api-response'

type Response = ResolvedApiResponse<SampleArticleEndpoint.GetResponse>
type Payload = { id: number }
type Cache = ApiResponseCache<Response, Payload>

@Module({ name: 'cache_sample_article', dynamic: true, store, namespaced: true })
export class CacheSampleArticleModule extends VuexModule implements CacheModule<Response, Payload> {
  private _cachedData: Cache | null = null

  @Mutation
  private SET_CACHED_DATA(payload: Cache | null): void {
    this._cachedData = payload
  }

  @Action({rawError: true})
  cache(payload: Cache) {
    this.SET_CACHED_DATA(payload)
  }

  @Action({rawError: true})
  clear() {
    this.SET_CACHED_DATA(null)
  }

  get cachedData(): Cache | null {
    return this._cachedData
  }
}

const cacheSampleArticleModule = getModule(CacheSampleArticleModule)
export { cacheSampleArticleModule }
