const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("express-jwt");
const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers");
console.log(typeDefs, resolvers);
const endpoint = '/graphql';

const app = express();
const auth = jwt({
    secret: 'bacon',
    credentialsRequired: false,
    algorithms: ['HS256'],
});
app.use(auth);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
        endpoint,
    },
    context: ({ req }) => {
        const user = req.headers.user
            ? JSON.parse(req.headers.user)
            : req.user
            ? req.user
            : null;
        return { user };
    },
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
}

startServer()

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("The server started on: http://localhost:" + PORT + endpoint);
});
