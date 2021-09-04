const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: Int!
    login: String!
  }

  type Query {
    getCurrentUser: String
  }

  type Mutation {
      register(login: String!, email: String!, password: String!): String
      login(login: String, email: String, password: String!): String
  }
`;

module.exports = typeDefs;
