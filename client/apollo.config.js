module.exports = {
    client: {
        includes: ['./*.graphql'],
        service: {
            name: 'Schema',
            localSchemaFile: __dirname + 'schema.graphql',
        },
    },
};