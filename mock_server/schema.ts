import { gql } from "apollo-server"
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'

export const typeDefs =
    gql`
    type Query {
        getUser(id: ID): User
    }

    type User {
        id: ID!
        name: String!
    }
`

export const getSchema = async () =>  {
    const schema = await loadSchema('schema/*.graphql', {
        loaders: [new GraphQLFileLoader()]
    })

    return schema
}