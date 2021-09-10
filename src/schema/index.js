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
    strength: String!
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
    strength: String!
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

  type Unit {
    id: Int!
    name: String!
    movement: Int!
    weaponSkill: Int!
    ballisticSkill: Int!
    strength: Int!
    toughness: Int!
    wounds: Int!
    leadership: Int!
    armourSave: Int!
    weapons: [Weapon]!
    abilities: [Ability]!
  }
  
  input UnitCreateInput {
    name: String!
    movement: Int!
    weaponSkill: Int!
    ballisticSkill: Int!
    strength: Int!
    toughness: Int!
    wounds: Int!
    leadership: Int!
    armourSave: Int!
    weapons: [Int]
    abilities: [Int]
  }

  type Query {
    getCurrentUser: User @isAuthenticated @loggingEnabled
    getUser(id: Int!): User @isAuthenticated @loggingEnabled
    getUsers: [User]! @isAuthenticated @loggingEnabled

    getResolverLog(id: Int!): ResolverLog @isAuthenticated
    getResolverLogs: [ResolverLog] @isAuthenticated

    getWeapon(id: Int!): Weapon @isAuthenticated @loggingEnabled
    weapons: [Weapon] @isAuthenticated @loggingEnabled
    
    abilities: [Ability]! @isAuthenticated @loggingEnabled

    units: [Unit]! @isAuthenticated @loggingEnabled
  }

  type Mutation {
    register(login: String!, email: String!, password: String!): String @loggingEnabled
    login(login: String!, password: String!): String @loggingEnabled
    updateCurrentUser(input: UserUpdateInput!): User @isAuthenticated @loggingEnabled
    deleteUser(id: Int!): Boolean @isAuthenticated @loggingEnabled

    createWeapon(input: WeaponCreateInput!): Weapon @isAuthenticated @loggingEnabled

    createAbility(input: AbilityCreateInput!): Ability @loggingEnabled

    createUnit(input: UnitCreateInput!): Unit @isAuthenticated @loggingEnabled
  }
`;

module.exports = typeDefs;
