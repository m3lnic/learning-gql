const { Ability } = require("Models");

module.exports = async (_, args, context) => {
  return Ability.findAll();
}
