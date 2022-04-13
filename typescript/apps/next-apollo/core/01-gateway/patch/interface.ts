import { PatchResponse } from '~/types/response/patch'

export interface IPatchGateway {
  fetch(noCache?: boolean): Promise<PatchResponse.Patch>
}
