const { User } = require('Models');

module.exports = async (_, args, { user }) => {
  const { id } = user;

  return User.findOne({
    where: {
      id,
    },
  });
};
