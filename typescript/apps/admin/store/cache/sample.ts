import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import { store } from '@/store'
import { ApiResponseCache, CacheModule } from '~/utils/api-with-cache-enabled'
import { SampleGetResponse } from '~/types/response/sample/get'
import { SampleGetRequest } from '~/types/request/sample/get'

type Cache = ApiResponseCache<SampleGetResponse, SampleGetRequest>

@Module({ name: 'cache_sample', dynamic: true, store, namespaced: true })
export class CacheSampleModule extends VuexModule implements CacheModule<SampleGetResponse, SampleGetRequest> {
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

const cacheSampleModule = getModule(CacheSampleModule)
export { cacheSampleModule }
