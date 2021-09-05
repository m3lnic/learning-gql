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

  type Weapon {
    id: Int!
    name: String!
    weaponStats: [WeaponStats]!
    abilities: [Ability]!
  }

  type WeaponStats {
    subAttackName: String
    type: String!
    range: Int!
    strength: Int!
    armourPiercing: Int!
    damage: String!
  }

  input WeaponCreateInput {
    name: String! 
    weaponStats: [WeaponStatCreateInput!]!
    abilities: [Int]
  }

  input WeaponStatCreateInput {
    subAttackName: String
    type: String!
    range: Int!
    strength: Int!
    armourPiercing: Int!
    damage: String!
  }

  type Ability {
    id: Int!
    name: String!
    effect: String!
  }

  input AbilityCreateInput {
    name: String!
    effect: String!
  }

  type Query {
    getCurrentUser: User @isAuthenticated @loggingEnabled
    getUser(id: Int!): User @isAuthenticated @loggingEnabled

    getResolverLog(id: Int!): ResolverLog @isAuthenticated
    getResolverLogs: [ResolverLog] @isAuthenticated

    getWeapon(id: Int!): Weapon
  }

  type Mutation {
    register(login: String!, email: String!, password: String!): String @loggingEnabled
    login(login: String!, password: String!): String @loggingEnabled
    updateCurrentUser(input: UserUpdateInput!): User @isAuthenticated @loggingEnabled
    deleteUser(id: Int!): Boolean @isAuthenticated @loggingEnabled

    createWeapon(input: WeaponCreateInput!): Weapon

    createAbility(input: AbilityCreateInput!): Ability
  }
`;

module.exports = typeDefs;
