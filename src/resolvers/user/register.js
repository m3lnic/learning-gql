const { ValidationError, ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { validateEmail } = require("Helpers");
const { User } = require("Models");
const generator = require('generate-password');
const sgMail = require('@sendgrid/mail');

module.exports = async (_, { login, email }) => {
  if (!validateEmail(email)) {
    throw new ValidationError('The email provided is invalid');
  }

  try {
    const password = generator.generate({ length: 32, numbers: true });

    sgMail.setApiKey(process.env.TWILIO_SECRET);
    await sgMail.send({
      to: email,
      from: 'battledex@technode.uk',
      subject: 'New account password',
      html: `
        <p>Your new account has the password: <strong>${password}</strong></p>
      `,
    }).catch((err) => console.log(err));

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
