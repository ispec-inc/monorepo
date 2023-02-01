import { SamplePostCreateRequest } from "~/types/request/sample/create";
import { SamplePostResponse } from "~/types/response/sample";

export type Methods = {
  get: {
    resBody: SamplePostResponse[]
  }
  post: {
    reqBody: SamplePostCreateRequest
    resBody: SamplePostResponse
  }
}
