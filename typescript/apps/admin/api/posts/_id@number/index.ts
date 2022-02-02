import { SamplePostUpdateRequest } from "~/types/request/sample/update";
import { SamplePostResponse } from "~/types/response/sample/find";

export type Methods = {
  get: {
    resBody: SamplePostResponse
  }

  patch: {
    reqBody: SamplePostUpdateRequest
    resBody: SamplePostResponse
  }

  delete: {}
}
