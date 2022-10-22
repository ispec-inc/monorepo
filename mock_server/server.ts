import { ApolloServer } from "apollo-server"
import { join } from 'node:path'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import { resolvers } from './resolvers'
import { articles } from "./data/article"

function main() {
    const schema = loadSchemaSync(
        join(__dirname, '..', 'go/schema.graphql'), {
            loaders: [new GraphQLFileLoader()],
        }
    )
    const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

    const server = new ApolloServer({
        schema: schemaWithResolvers,
        context: () => {
            return {
                articles: articles,
            }
        }
    })

    server.listen({port: 3000}).then(({url}) => {
        console.log(`🚀 Server ready at ${url}`)
    })
}

main()