import { codeList } from '~/constants/error-message'
import { Maybe } from '~/types/advanced'

export namespace ErrorModelHelper {
  export function statusCode2JpMessage(statusCode: number): Maybe<string> {
    return codeList[statusCode] ?? null
  }
}
