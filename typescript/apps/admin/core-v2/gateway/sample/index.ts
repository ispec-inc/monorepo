import { SampleModelAdapter } from "~/core-v2/adapter/sample"
import { ISampleModel } from "~/core-v2/model/sample/interface"

export interface SampleResponse {
  id: string
  name: string
}

export namespace SampleGateway {
  export function findAll(): Promise<ISampleModel[]> {
    return new Promise((resolve) => {
      resolve([].map((v) => new SampleModelAdapter(v)))
    })
  }

  export function remove(_id: string): Promise<void> {
    return new Promise((resolve) => resolve())
  }
}
