const { Unit, WeaponName, Ability } = require('models');

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
