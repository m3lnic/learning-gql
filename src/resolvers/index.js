const { abilityMutations, abilityQueries } = require('./ability');
const { loggingMutations, loggingQueries } = require('./logging');
const { userMutations, userQueries } = require('./user');
const { unitMutations, unitQueries } = require('./unit');
const { weaponMutations, weaponQueries } = require('./weapons');
const scalars = require('./scalars');

module.exports = {
  ...scalars,
  Query: {
    ...abilityQueries,
    ...loggingQueries,
    ...userQueries,
    ...unitQueries,
    ...weaponQueries,
  },
  Mutation: {
    ...abilityMutations,
    ...loggingMutations,
    ...userMutations,
    ...unitMutations,
    ...weaponMutations,
  },
}
