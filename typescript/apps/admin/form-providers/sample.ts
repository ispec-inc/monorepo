import * as FastForm from "@monorepo/fast-form";

export namespace SampleForm {
  type Tag = {
    name: string
  }

  export type AsObject = {
    basicInfo: {
      title: string
      description: string
      price: number
      published: boolean
      endAt: string
      type: number
      image: string
    }
    tag: {
      items: Tag[]
    }
  }

  export function provideModule(): FastForm.SeparatedFormModule<AsObject> {
    const tagFormInitializer = (value?: Tag): FastForm.RFormGroupModule<Tag> => {
      const formStructure: FastForm.RFormGroupModule<Tag>['structure'] = {
        name: new FastForm.RFormTextInputModule('名前', value?.name || '', ['required'])
      }
      const headingProvider = (value: Tag) => {
        return `${value.name}`
      }
      return new FastForm.RFormGroupModule(formStructure, ['name'], headingProvider)
    }

    const publishedInputModule = new FastForm.RFormSwitchInputModule('公開する', false)
    const endAtInputModule = new FastForm.RFormDateInputModule('公開終了日', '', 'YYYY-MM-DD', ['required'])

    // 他のフォームの値など、条件に応じて非表示にする必要がある場合は.setDisplayConditionFn()を用いる
    endAtInputModule.setDisplayConditionFn(() => publishedInputModule.value === true)

    const basicInfoFormStructure: FastForm.FormStructure<AsObject['basicInfo']> = {
      title: new FastForm.RFormTextInputModule('タイトル', '', ['required']),
      description: new FastForm.RFormTextInputModule('説明', ''),
      price: new FastForm.RFormNumberInputModule('価格', 0),
      published: publishedInputModule,
      endAt: endAtInputModule,
      type: new FastForm.RFormSelectInputModule<number>('種別', 1, [{ text: 'タイプA', value: 1 }, { text: 'タイプB', value: 2 }], 1),
      image: new FastForm.RFormImageInputModule('画像', 'https://picsum.photos/200/300'),
    }

    const tagFormStructure: FastForm.FormStructure<AsObject['tag']> = {
      items: new FastForm.RFormGroupListModule<Tag>('タグ', [], tagFormInitializer)
    }

    return new FastForm.SeparatedFormModule<AsObject>(
      {
        basicInfo: new FastForm.RFormModule(basicInfoFormStructure, ['title', 'description', 'type', 'price', 'published', 'endAt', 'image']),
        tag: new FastForm.RFormModule(tagFormStructure, ['items'])
      },
      [['basicInfo', '基本情報'], ['tag', 'タグ']]
    )
  }
}
