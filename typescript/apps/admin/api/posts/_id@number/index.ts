import { SamplePostUpdateRequest } from "~/types/request/sample/update";
import { SamplePostResponse } from "~/types/response/sample";

export type Methods = {
  get: {
    resBody: SamplePostResponse
  }

  patch: {
    reqBody: SamplePostUpdateRequest
    resBody: SamplePostResponse
  }

  delete: Record<string, never>
}
