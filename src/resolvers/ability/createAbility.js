const { Ability } = require("Models");

module.exports = async (_, { input: {
  name,
  effect,
}}) => {
  const ability = await Ability.create({
    name,
    effect,
  });

  return ability;
}
