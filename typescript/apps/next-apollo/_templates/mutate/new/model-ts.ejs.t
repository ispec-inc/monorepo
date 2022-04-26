---
to: "models/mutate/mutate-<%= h.changeCase.paramCase(name) %>/index.ts"
---
import { <%= h.changeCase.pascal(name) %>MutationVariables } from '~/__generated__/graphql'

export default class Mutate<%= h.changeCase.pascal(name) %>Model {
  
  constructor() {
  }

  variables(): <%= h.changeCase.pascal(name) %>MutationVariables {
    return {
    }
  }
}

