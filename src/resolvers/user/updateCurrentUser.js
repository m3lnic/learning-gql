const { AuthenticationError } = require('apollo-server-errors');
const { sanitizeJson } = require('Helpers');
const { User } = require('Models');

module.exports = async (_, args, { user }) => {
  const { input } = sanitizeJson(args);

  if (input?.id !== user?.id || !input?.id) {
    throw new AuthenticationError('You may only perform this action on yourself.');
  }
  
  const updatedUser = await User.update(input, {
    where: {
      id: user?.id,
    },
    returning: true,
  });

  return updatedUser[1][0];
};
