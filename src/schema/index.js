const { gql } = require("apollo-server-express");

const typeDefs = gql`
  directive @isAuthenticated on FIELD_DEFINITION

  type User {
    id: Int!
    login: String!
    email: String!
  }

  input UserUpdateInput {
    id: Int!
    login: String
    email: String
  }

  type Query {
    getCurrentUser: User @isAuthenticated
    getUser(id: Int!): User @isAuthenticated
  }

  type Mutation {
    register(login: String!, email: String!, password: String!): String
    login(login: String!, password: String!): String
    updateCurrentUser(input: UserUpdateInput!): User @isAuthenticated
  }
`;

module.exports = typeDefs;
