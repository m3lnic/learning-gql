const userMutations = {
  register: require('./register'),
  login: require('./login'),
};

const userQueries = {

};

module.exports = {
  userMutations,
  userQueries,
}
