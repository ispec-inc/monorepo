import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators'
import { store } from '@/store'
import { ServiceIndex } from '~/core/03-service'

@Module({ name: 'page-services', dynamic: true, store, namespaced: true })
export class PageServicesModule extends VuexModule {
  private cache: Partial<ServiceIndex.AsObject> = {}

  @Mutation
  private CACHE_SERVICE<T extends keyof ServiceIndex.AsObject>(payload: { key: T, service: ServiceIndex.AsObject[T] }): void {
    this.cache[payload.key] = payload.service
  }

  @Action({rawError: true})
  getService<T extends ServiceIndex.AsObject[keyof ServiceIndex.AsObject]>(key: ServiceIndex.FilteredKey<T>): T {
    const cachedService = this.cache[key]
    if (cachedService) {
      return cachedService as T
    }

    const service = ServiceIndex.constructors[key]()
    this.CACHE_SERVICE({ key: key as keyof ServiceIndex.AsObject, service })
    return service as T
  }
}

const pageServicesModule = getModule(PageServicesModule)
export { pageServicesModule }
