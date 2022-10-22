import { mutation } from "./resolver/mutation"
import { query } from "./resolver/query"

export const resolvers = {
    Query: query,
    Mutation: mutation
}