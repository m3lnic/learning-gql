const { validateEmail } = require("../../helpers");


module.exports = (_, { login, email, password}) => {
  console.log(login, password);
  return 'pancake';
}
