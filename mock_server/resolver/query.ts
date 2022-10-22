export const query = {
    getArticle: (parent: any, args: any, context: any) => {
        let result = context.articles.find((v: any) => v.id === args.id);
        return result
    }
}