import { ArticlesResponse } from '~/types/response/articles'

export interface CreateArticleRequest {
    title: string
    body: string
}

export type CreateArticleResponse = ArticlesResponse
