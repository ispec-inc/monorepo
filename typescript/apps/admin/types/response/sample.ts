export interface SamplePostResponse {
  id: number
  userId: number
  title: string
  body: string
}

export interface SamplePostCommentResponse {
  id: number
  postId: number
  name: string
  email: string
  body: string
}
