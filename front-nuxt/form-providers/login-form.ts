import * as FastForm from "@monorepo/fast-form";
import UserResource from "~/resources/user";

export namespace LoginForm {
  export type AsObject = {
    email: string,
    password: string,
  }

  export function provideModule(user?: UserResource): FastForm.FormModule<AsObject> {
    const structure: FastForm.FormStructure<AsObject> = {
      email: new FastForm.FormTextInputModule('メールアドレス', user?.email || '', ['required', 'email']),
      password: new FastForm.FormPasswordInputModule('パスワード', user?.password || '', ['required']),
    }
    return new FastForm.FormModule(structure, ['email', 'password'])
  }
}
