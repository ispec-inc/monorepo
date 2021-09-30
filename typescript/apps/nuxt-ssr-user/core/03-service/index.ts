import { SampleArticleGatewayImpl } from "../01-gateway/sample/article"
import { SampleArticleRepositoryImpl } from "../02-repository/sample/article"
import { SampleArticleIndexPageService } from "./sample/article"

export namespace ServiceIndex {
  export const constructors = {
    sampleArticle: (): SampleArticleIndexPageService => {
      return new SampleArticleIndexPageService(new SampleArticleRepositoryImpl(new SampleArticleGatewayImpl()))
    }
  }

  export type AsObject = { [P in keyof typeof constructors]: ReturnType<typeof constructors[P]> }

  type FilterByService<T extends keyof AsObject, U extends AsObject[keyof AsObject]> = T extends any ? AsObject[T] extends U ? T : never : never
  export type FilteredKey<T extends AsObject[keyof AsObject]> = FilterByService<keyof AsObject, T>
}
