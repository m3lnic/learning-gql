const { userMutations, userQueries } = require('./user');

console.log(userMutations, userQueries);

module.exports = {
  Query: {
    ...userQueries,
  },
  Mutation: {
    ...userMutations,
  },
}
