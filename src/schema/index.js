const { gql } = require("apollo-server-express");

const typeDefs = gql`
  directive @isAuthenticated on FIELD_DEFINITION
  directive @loggingEnabled on FIELD_DEFINITION

  scalar DateTime

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

  type ResolverLog {
    id: Int!
    name: String!
    arguments: String!
    context: String!
    returnValue: String!
    startTime: DateTime!
    endTime: DateTime!
    executionTime: Int!
  }

  type Query {
    getCurrentUser: User @isAuthenticated @loggingEnabled
    getUser(id: Int!): User @isAuthenticated @loggingEnabled

    getResolverLog(id: Int!): ResolverLog @isAuthenticated
    getResolverLogs: [ResolverLog] @isAuthenticated
  }

  type Mutation {
    register(login: String!, email: String!, password: String!): String @loggingEnabled
    login(login: String!, password: String!): String @loggingEnabled
    updateCurrentUser(input: UserUpdateInput!): User @isAuthenticated @loggingEnabled
    deleteUser(id: Int!): Boolean @isAuthenticated @loggingEnabled
  }
`;

module.exports = typeDefs;
