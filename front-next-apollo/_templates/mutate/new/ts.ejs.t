---
to: "hooks/<%= h.changeCase.paramCase(name) %>-service/index.ts"
---
import { gql } from '@apollo/client'
import Mutate<%= h.changeCase.pascal(name) %>Model from '~/models/mutate/mutate-<%= h.changeCase.param(name) %>'
import { use<%= h.changeCase.pascal(name) %>Mutation } from '~/__generated__/graphql'

const _MUTATION = gql`
  mutation <%= h.changeCase.camel(name) %>() {
  }
`

export const use<%= h.changeCase.pascal(name) %>Service = () => {
  const [<%= h.changeCase.camel(name) %>Mutation, <%= h.changeCase.camel(name) %>Response] = use<%= h.changeCase.pascal(name) %>Mutation()

  const <%= h.changeCase.camel(name) %> = (mutationModel: Mutate<%= h.changeCase.pascal(name) %>Model) => {
    <%= h.changeCase.camel(name) %>Mutation({ variables: mutationModel.variables() })
  }

  return {
    <%= h.changeCase.camel(name) %>,
    <%= h.changeCase.camel(name) %>Response
  }

}

