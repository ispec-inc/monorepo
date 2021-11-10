export class SampleAuthorModel {
  readonly id: number
  readonly firstName: string
  readonly lastName: string

  constructor(id: number, firstName: string, lastName: string) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
  }

  clone(): SampleAuthorModel {
    return new SampleAuthorModel(this.id, this.firstName, this.lastName)
  }

  get fullName(): string {
    return `${this.lastName} ${this.firstName}`
  }
}
