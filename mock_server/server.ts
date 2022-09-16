import { ApolloServer } from "apollo-server"
import { typeDefs } from "./schema"
import { resolvers } from "./resolvers"
import { users } from "./data/user"

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        return {
            users: users,
        }
    }
})

server.listen({port: 3000}).then(({url}) => {
    console.log(`🚀 Server ready at ${url}`)
})

export default server