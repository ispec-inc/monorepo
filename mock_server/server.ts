import { ApolloServer } from "apollo-server"
import { loadSchema } from '@graphql-tools/load'
import { resolvers } from "./resolvers"
import { addResolversToSchema } from '@graphql-tools/schema'

async function main() {   
    // const schema = await loadSchema(join(__dirname, 'schema/schema.graphql'), {
    //     loaders: [new GraphQLFileLoader()] 
    // })

    const schema = await loadSchema({{host}}/graphql-ddd/schema.graphql)

    const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

    const server = new ApolloServer({
        schema: schemaWithResolvers,
    })

    server.listen({port: 3000}).then(({url}) => {
        console.log(`🚀 Server ready at ${url}`)
    })
}

main()