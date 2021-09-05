const { abilityMutations, abilityQueries } = require('./ability');
const { userMutations, userQueries } = require('./user');
const { loggingMutations, loggingQueries } = require('./logging');
const { weaponMutations, weaponQueries } = require('./weapons');
const scalars = require('./scalars');

module.exports = {
  ...scalars,
  Query: {
    ...abilityQueries,
    ...loggingQueries,
    ...userQueries,
    ...weaponQueries,
  },
  Mutation: {
    ...abilityMutations,
    ...loggingMutations,
    ...userMutations,
    ...weaponMutations,
  },
}
