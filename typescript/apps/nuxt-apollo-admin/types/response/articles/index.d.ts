export interface ArticlesResponse {
  article: Array<{
     id: string
     title: string
     body: string
     writer: string
  }>
}
