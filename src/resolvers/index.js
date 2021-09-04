const { userMutations, userQueries } = require('./user');

module.exports = {
  Query: {
    ...userQueries,
  },
  Mutation: {
    ...userMutations,
  },
}
