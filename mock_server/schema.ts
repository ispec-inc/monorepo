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

const getSchema = () => {
    try {
        fetch('uri', {
            method: "POST",
            headers: {
                "":""
            }
        }).then((response) => {
            console.log(response.json());
            return response.json()
        })
    } catch (error) {
        alert(error)
    }
}