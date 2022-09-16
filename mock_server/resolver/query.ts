export const query = {
    getUser: (parent: any, args: any, context: any) => {
        let result = context.users.find((v: any) => v.id === args.id);
        return result
    }
}