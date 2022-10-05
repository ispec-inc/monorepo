import {gql} from 'apollo-server'
const axios = require('axios');

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

export const getSchema = async () => {
    try {
        const res = await axios.get('http://localhost:9000/graphql-ddd/schema.graphql')
        return res.data
    } catch (error) {
        return error
    }
}