const { ValidationError, ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { validateEmail } = require("Helpers");
const { User } = require("Models");

module.exports = async (_, { login, email, password}) => {
  if (!validateEmail(email)) {
    throw new ValidationError('The email provided is invalid');
  }

  try {
    const user = await User.create({
      login,
      email,
      password: await bcrypt.hash(password, 10),
      lastLogin: new Date(),
    });
  
    return jsonwebtoken.sign({ id: user.id, login: user.login }, process.env.JWT_SECRET, {
      expiresIn: "3m",
    });
  } catch (e) {
    if (e instanceof ValidationError) {
      throw e;
    }

    throw new ApolloError('There was an error creating this account. Please try a different username or email.');
  }
}
