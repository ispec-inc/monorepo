import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule,
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

}

@Module({ name: 'sampleModule', dynamic: true, store, namespaced: true })
export class SampleModule extends VuexModule {
  private sampleState: Array<any> = []

  @Mutation
  SET_RESPONSE(value: Array<any>): void {
    this.sampleState = value
  }

  @Action({rawError: true})
  fetch(): Promise<void> {
    console.debug('fetch')
    return new Promise<void>(( resolve, reject) => {
      $axios.$get<Array<any>>('https://api.github.com/orgs/ispec-inc/repos')
        .then((response: any) => {
          this.SET_RESPONSE(response)
          resolve()
        })
        .catch((apiError: any) => {
          reject(apiError)
        })
    })
  }

  get response(): Array<any> {
    return this.sampleState
  }

}

const sampleModule = getModule(SampleModule)
export default sampleModule
