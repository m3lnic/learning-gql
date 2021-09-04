const { ValidationError, ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { validateEmail } = require("Helpers");
const { User } = require("Models");

module.exports = async (_, { login, password}) => {
  try {
    const user = await User.findOne({
      where: {
        login,
      },
    });

    if(!user) {
      throw new ValidationError('A user does not exist with the provided login information');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new ValidationError("The password entered is incorrect.");
    }

    await User.update({ lastLogin: new Date() }, {
      where: {
        id: user.id,
      }
    });

    return jsonwebtoken.sign({ id: user.id, login: user.login }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  } catch (e) {
    console.log(e);
    if (e instanceof ValidationError) {
      throw e;
    }
    
    throw new ApolloError('There was an unknown error loggin in');
  }
}
