import * as FastForm from '@monorepo/fast-form'
import ArticleResource from '~/resources/article'

export namespace ArticleForm {
  export type AsObject = {
    title: string
    body: string
  }

  export function provideModule(
    article?: ArticleResource
  ): FastForm.FormModule<AsObject> {
    const structure: FastForm.FormStructure<AsObject> = {
      title: new FastForm.FormTextInputModule(
        'タイトル',
        article?.title || '',
        ['required']
      ),
      body: new FastForm.FormTextInputModule('本文', article?.body || '', [
        'required',
      ]),
    }
    return new FastForm.FormModule(structure, ['title', 'body'])
  }
}
