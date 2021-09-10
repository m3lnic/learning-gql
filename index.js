require('module-alias/register');

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("express-jwt");
const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const isAuthenticatedDirective = require("./src/schema/isAuthenticatedDirective");
const loggingDirective = require("./src/schema/loggingDirective");
const cors = require('cors');

const endpoint = '/graphql';

const app = express();
const auth = jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false,
    algorithms: ['HS256'],
});
app.use(auth);
app.use(cors());

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

schema = isAuthenticatedDirective(schema, 'isAuthenticated');
schema = loggingDirective(schema, 'loggingEnabled');

const server = new ApolloServer({
  schema,
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
