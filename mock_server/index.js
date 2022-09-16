const {ApolloServer, gql} = require('apollo-server')

const typeDefs = gql`
    type Query {
        hello: String
        number: Int
    }
`

const server = new ApolloServer({
    typeDefs,
    mocks: true
})

server.listen().then(({url}) => {
    console.log(`server ready at ${url}`)
})