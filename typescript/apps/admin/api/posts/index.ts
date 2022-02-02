import { SamplePostCreateRequest } from "~/types/request/sample/create";
import { SamplePostResponse } from "~/types/response/sample/find";

export type Methods = {
  get: {
    resBody: SamplePostResponse[]
  }
  post: {
    reqBody: SamplePostCreateRequest
    resBody: SamplePostResponse
  }
}
