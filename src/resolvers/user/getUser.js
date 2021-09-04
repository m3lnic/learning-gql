const { User } = require('Models');

module.exports = async (_, { id }, context) => {
  return User.findOne({
    where: {
      id,
    },
  });
};
