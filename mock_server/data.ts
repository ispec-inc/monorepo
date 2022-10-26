var casual = require('casual');

export const mocks = {
    Article: () => ({
        id: casual.integer(1, 10),
        title: casual.title,
        content: casual.sentence,
    }),
    User: () => ({
        id: casual.integer(1, 10),
        name: casual.name,
    })
}