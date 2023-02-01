---
to: "models/query/query-<%= h.changeCase.paramCase(name) %>/index.ts"
---
// import { IQuery<%= h.changeCase.pascal(name) %>Model } from '~/pages/<%= h.changeCase.param(name) %>/query'
import { <%= h.changeCase.pascal(name) %>Query } from '~/__generated__/graphql'

export default class Query<%= h.changeCase.pascal(name) %>Model /* implements IQuery<%= h.changeCase.pascal(name) %>Model */{
  private readonly data: <%= h.changeCase.pascal(name) %>Query
  
  constructor(data: <%= h.changeCase.pascal(name) %>Query) {
    this.data = data
  }
}

