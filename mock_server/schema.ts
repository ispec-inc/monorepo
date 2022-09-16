import {gql} from 'apollo-server'

export const typeDefs = gql`
    type Query {
        getUser(id: ID): User
    }

    type User {
        id: ID!
        name: String!
    }
`