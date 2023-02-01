---
to: "hooks/<%= h.changeCase.paramCase(name) %>-service/index.ts"
---
import gql from 'graphql-tag'
import { useMemo } from 'react'
import Query<%= h.changeCase.pascal(name) %>Model from '~/models/query/query-<%= h.changeCase.param(name) %>/index'
import { use<%= h.changeCase.pascal(name) %>Query } from '~/__generated__/graphql'

const _QUERY = gql`
  query <%= h.changeCase.camel(name) %> {
  }
`

export const use<%= h.changeCase.pascal(name) %>Service = () => {
  const { data, loading, error, refetch } = use<%= h.changeCase.pascal(name) %>Query()
  const queryModel = useMemo(() => data ? new Query<%= h.changeCase.pascal(name) %>Model(data) : null, [data])

  return {
    queryModel,
    loading,
    error,
    refetch
  }

}


