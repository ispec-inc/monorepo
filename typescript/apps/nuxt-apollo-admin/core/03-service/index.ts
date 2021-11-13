import { AuthGatewayImpl } from "../01-gateway/auth";
import { AuthRepositoryImpl } from "../02-repository/auth";
import { LoginPageService } from "./login";

export namespace ServiceIndex {
  export const constructors = {
    login: (): LoginPageService => {
      return new LoginPageService(new AuthRepositoryImpl(new AuthGatewayImpl()))
    }
  }

  export type AsObject = { [P in keyof typeof constructors]: ReturnType<typeof constructors[P]> }

  type FilterByService<T extends keyof AsObject, U extends AsObject[keyof AsObject]> = T extends any ? AsObject[T] extends U ? T : never : never
  export type FilteredKey<T extends AsObject[keyof AsObject]> = FilterByService<keyof AsObject, T>
}
