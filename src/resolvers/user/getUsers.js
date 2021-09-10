const { User } = require('Models');

module.exports = async (_, args, context) => {
  return User.findAll();
};
