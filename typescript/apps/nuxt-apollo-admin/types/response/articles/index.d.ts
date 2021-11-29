export interface ArticlesResponse {
  articles: Array<{
     id: string
     title: string
     body: string
    //  writer: {
    //    id: string
    //    name: string
    //  }
  }>
}
