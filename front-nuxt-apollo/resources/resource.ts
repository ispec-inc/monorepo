export interface ResourceDetail {
  label: string
  value: string
  isUrl?: boolean
}

export default class Resource {
  id: number

  constructor(id: number) {
    this.id = id
  }

  get itemName(): string {
    return ''
  }
}
