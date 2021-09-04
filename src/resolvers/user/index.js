const userMutations = {
  register: require('./register'),
  login: require('./login'),
  updateCurrentUser: require('./updateCurrentUser'),
};

const userQueries = {
  getCurrentUser: require('./getCurrentUser'),
  getUser: require('./getUser'),
};

module.exports = {
  userMutations,
  userQueries,
}
