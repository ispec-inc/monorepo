import { compareObject } from "./compare-object"

export type ApiResponseCache<T, U extends Object> = {
  response: T
  payload: U
}

export interface CacheModule<T, U extends Object> {
  cache(payload: ApiResponseCache<T, U>): void
  clear(): void
  readonly cachedData: ApiResponseCache<T, U> | null
}

export class ApiWithCacheEnabled<T, U extends Object> {
  private readonly endpoint: (payload: U) => Promise<T>
  private readonly cacheModule: CacheModule<T, U>

  constructor(endpoint: (payload: U) => Promise<T>, cacheModule: CacheModule<T, U>) {
    this.cacheModule = cacheModule
    this.endpoint = endpoint
  }

  callApi(payload: U): Promise<T> {
    // キャッシュがある場合はペイロードを比較し、同一である場合はキャッシュされたレスポンスでresolveする
    if (this.cachedData && compareObject(payload, this.cachedData.payload)) {
      return Promise.resolve(this.cachedData.response)
    }

    return new Promise((resolve, reject) => {
      this.endpoint(payload)
        .then((response) => {
          this.cacheModule.cache({ payload, response })
          resolve(response)
        })
        .catch(reject)
    })
  }

  clearCache(): void {
    this.cacheModule.clear()
  }

  private get cachedData(): ApiResponseCache<T, U> | null {
    return this.cacheModule.cachedData
  }
}
