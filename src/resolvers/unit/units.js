const { Unit, WeaponName, Ability } = require('Models');

module.exports = async (_, args, context) => {
  return Unit.findAll({ include: [
    {
      model: WeaponName,
      as: 'weapons',
      include: ['weaponStats', 'abilities'],
    },
    {
      model: Ability,
      as: 'abilities',
    }
  ]});
};
