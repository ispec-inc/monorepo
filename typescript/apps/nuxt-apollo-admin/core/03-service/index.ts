import { AuthGatewayImpl } from '../01-gateway/auth'
import { AuthRepositoryImpl } from '../02-repository/auth'
import { LoginPageService } from './login'
import { GraphqlPageService, IGraphqlPageService } from '~/core/03-service/sample-graphql'
import { SampleGraphqlRepositoryImpl } from '~/core/02-repository/articles'
import { ArticlesGatewayImpl } from '~/core/01-gateway/articles'

export namespace ServiceIndex {
  export const constructors = {
    login: (): LoginPageService => {
      return new LoginPageService(new AuthRepositoryImpl(new AuthGatewayImpl()))
    },
    sampleGraphql: (): IGraphqlPageService => {
      return new GraphqlPageService(new SampleGraphqlRepositoryImpl(new ArticlesGatewayImpl()))
    }
  }

  export type AsObject = { [P in keyof typeof constructors]: ReturnType<typeof constructors[P]> }

  type FilterByService<T extends keyof AsObject, U extends AsObject[keyof AsObject]> = T extends unknown ? AsObject[T] extends U ? T : never : never
  export type FilteredKey<T extends AsObject[keyof AsObject]> = FilterByService<keyof AsObject, T>
}
