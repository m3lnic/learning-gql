const { WeaponName } = require('Models');

module.exports = async (_, { id }, context) => {
  const weapon = await WeaponName.findAll({
    include: ['weaponStats', 'abilities']
  });

  return weapon;
};
