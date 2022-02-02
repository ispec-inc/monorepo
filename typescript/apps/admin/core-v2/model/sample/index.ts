import { ISampleModel } from "./interface"

export class SampleModelImpl implements ISampleModel {
  readonly id: string
  readonly name: string

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}
