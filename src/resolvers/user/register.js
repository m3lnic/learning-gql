const { ValidationError } = require("apollo-server-errors");
const bcrypt = require("bcrypt");
const { validateEmail } = require("Helpers");
const { User } = require("Models");

module.exports = async (_, { login, email, password}) => {
  if (!validateEmail(email)) {
    throw new ValidationError('The email provided is invalid');
  }

  const user = await User.create({
    login,
    email,
    password: await bcrypt.hash(password, 10),
  });

  return 'pancake';
}
