const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const Schema = require('./schema/schema');
const resolver = require('./resolvers/resolver')
const router = express.Router();



router.use(
    '/graphql',
    graphqlHTTP({
        schema: Schema,
        rootValue: resolver,
        graphiql: true,
    }),
);

module.exports = router