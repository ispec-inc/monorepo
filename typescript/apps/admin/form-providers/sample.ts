import { RFormDateInputModule, RFormImageInputModule, RFormModule, RFormNumberInputModule, RFormSelectInputModule, RFormSwitchInputModule, RFormTextInputModule } from "@monorepo/fast-form";

export namespace SampleForm {
  export type AsObject = {
    title: string
    description: string
    price: number
    published: boolean
    endAt: string
    type: number
    image: string
  }

  export function provideModule(): RFormModule<AsObject> {
    const formStructure: RFormModule<AsObject>['structure'] = {
      title: new RFormTextInputModule('タイトル', '', ['required']),
      description: new RFormTextInputModule('説明', ''),
      price: new RFormNumberInputModule('価格', 0),
      published: new RFormSwitchInputModule('公開する', false),
      endAt: new RFormDateInputModule('公開終了日', '', 'YYYY-MM-DD'),
      type: new RFormSelectInputModule<number>('種別', 1, [{ text: 'タイプA', value: 1 }, { text: 'タイプB', value: 2 }], 1),
      image: new RFormImageInputModule('画像', 'https://picsum.photos/200/300')
    }

    return new RFormModule(formStructure, ['title', 'description', 'type', 'price', 'published', 'endAt', 'image'])
  }
}
