const { userMutations, userQueries } = require('./user');
const { loggingMutations, loggingQueries } = require('./logging');
const scalars = require('./scalars');

module.exports = {
  ...scalars,
  Query: {
    ...loggingQueries,
    ...userQueries,
  },
  Mutation: {
    ...loggingMutations,
    ...userMutations,
  },
}
