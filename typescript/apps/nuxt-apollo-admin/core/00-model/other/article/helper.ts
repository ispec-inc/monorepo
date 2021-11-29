import { ArticleOption } from '~/types/article-option'
import { ArticleContent } from '~/types/article-content'

export namespace ArticleModelHelper {
  export function pairIdTitle(id: string, title: string): ArticleOption {
    return {
      id,
      title
    }
  }

  export function createContent(title: string, body: string): ArticleContent {
    return {
      title,
      body
    }
  }
}
