import { FormStructure, RFormModule, RFormTextInput } from "@monorepo/fast-form";

export namespace SampleForm {
  export type AsObject = {
    title: string
    description: string
  }

  export function provideModule(): RFormModule<AsObject> {
    const formStructure: FormStructure<AsObject> = {
      title: new RFormTextInput('タイトル', '', ['required']),
      description: new RFormTextInput('説明', '', [])
    }

    return new RFormModule(formStructure, ['title', 'description'])
  }
}
