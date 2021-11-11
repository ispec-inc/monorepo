import Resource from '~/resources/resource'

type Article = {
  id: number
  title: string
  body: string
}

export default class ArticleResource extends Resource {
  private data: Article

  title: string
  body: string

  constructor(data: Article) {
    super(data.id)
    this.data = data
    this.title = data.title
    this.body = data.body
  }
}
