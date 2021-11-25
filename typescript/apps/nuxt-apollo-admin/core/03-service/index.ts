import { AuthGatewayImpl } from '../01-gateway/auth'
import { AuthRepositoryImpl } from '../02-repository/auth'
import { LoginPageService } from './login'
import { GraphqlPageService, IGraphqlPageService } from '~/core/03-service/sample-graphql'
import { ViewSampleGraphqlRepositoryImpl } from '~/core/02-repository/sample-graphql'
import { ViewSampleGraphqlGatewayImpl } from '~/core/01-gateway/sample-graphql'
import { CreateArticleGatewayImpl } from '~/core/01-gateway/create-article'

export namespace ServiceIndex {
  export const constructors = {
    login: (): LoginPageService => {
      return new LoginPageService(new AuthRepositoryImpl(new AuthGatewayImpl()))
    },
    sampleGraphql: (): IGraphqlPageService => {
      return new GraphqlPageService(
        new ViewSampleGraphqlRepositoryImpl(
          new ViewSampleGraphqlGatewayImpl(),
          new CreateArticleGatewayImpl()
        )
      )
    }
  }

  export type AsObject = { [P in keyof typeof constructors]: ReturnType<typeof constructors[P]> }

  type FilterByService<T extends keyof AsObject, U extends AsObject[keyof AsObject]> = T extends unknown ? AsObject[T] extends U ? T : never : never
  export type FilteredKey<T extends AsObject[keyof AsObject]> = FilterByService<keyof AsObject, T>
}
