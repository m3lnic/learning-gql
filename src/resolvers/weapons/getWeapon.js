const { WeaponStats, WeaponName } = require('Models');

module.exports = async (_, { id }, context) => {
  const weapon = await WeaponName.findOne({
    where: {
      id,
    },
    include: ['weaponStats', 'abilities']
  });

  console.log(JSON.stringify(weapon))

  return weapon;
};
