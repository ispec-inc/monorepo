import { RFormDateInputModule, RFormGroupListModule, RFormGroupModule, RFormImageInputModule, RFormModule, RFormNumberInputModule, RFormSelectInputModule, RFormSwitchInputModule, RFormTextInputModule } from "@monorepo/fast-form";

export namespace SampleForm {
  type Tag = {
    name: string
  }

  export type AsObject = {
    title: string
    description: string
    price: number
    published: boolean
    endAt: string
    type: number
    image: string
    tags: Tag[]
  }

  export function provideModule(): RFormModule<AsObject> {
    const tagFormInitializer = (value?: Tag): RFormGroupModule<Tag> => {
      const formStructure: RFormGroupModule<Tag>['structure'] = {
        name: new RFormTextInputModule('名前', value?.name || '')
      }
      const headingProvider = (value: Tag) => {
        return `${value.name}`
      }
      return new RFormGroupModule(formStructure, ['name'], headingProvider)
    }

    const formStructure: RFormModule<AsObject>['structure'] = {
      title: new RFormTextInputModule('タイトル', '', ['required']),
      description: new RFormTextInputModule('説明', ''),
      price: new RFormNumberInputModule('価格', 0),
      published: new RFormSwitchInputModule('公開する', false),
      endAt: new RFormDateInputModule('公開終了日', '', 'YYYY-MM-DD'),
      type: new RFormSelectInputModule<number>('種別', 1, [{ text: 'タイプA', value: 1 }, { text: 'タイプB', value: 2 }], 1),
      image: new RFormImageInputModule('画像', 'https://picsum.photos/200/300'),
      tags: new RFormGroupListModule<Tag>('タグ', [], tagFormInitializer)
    }

    return new RFormModule(formStructure, ['title', 'description', 'type', 'price', 'published', 'endAt', 'image', 'tags'])
  }
}
