const { ValidationError } = require("apollo-server-errors");
const { validateEmail } = require("../../helpers");

module.exports = (_, { login, email, password}) => {
  if (!validateEmail(email)) {
    throw new ValidationError('The email provided is invalid');
  }
  return 'pancake';
}
