import { mutation } from "./mutation"
import { query } from "./query"

export const resolvers = {
    Query: query,
    Mutation: mutation,
}