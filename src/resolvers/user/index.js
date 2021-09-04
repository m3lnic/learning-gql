const userMutations = {
  register: require('./register'),
  login: require('./login'),
  updateCurrentUser: require('./updateCurrentUser'),
  deleteUser: require('./deleteUser'),
};

const userQueries = {
  getCurrentUser: require('./getCurrentUser'),
  getUser: require('./getUser'),
};

module.exports = {
  userMutations,
  userQueries,
}
