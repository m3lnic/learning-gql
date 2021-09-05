const { WeaponName, WeaponStats, Ability } = require('Models');

module.exports = async (_, { input: { 
  name,
  weaponStats = [] ,
  abilities = [],
} }, context) => {
  let weaponName = await WeaponName.findOne({
    where: {
      name
    },
  });

  if (!weaponName) {
    weaponName = await WeaponName.create({
      name,
    });
  }

  await weaponStats.map(async ({
    subAttackName = null,
    type,
    range,
    strength,
    armourPiercing,
    damage,
  }) => {
    const value = await WeaponStats.create({
      subAttackName,
      weaponNameId: weaponName?.id,
      type,
      range,
      strength,
      armourPiercing,
      damage,
    });
    console.log(value)
  })

  await abilities.map(async (value) => {
    const ability = await Ability.findOne({ where: { id: value }});
    return weaponName.addAbility(ability);
  })

  return WeaponName.findOne({
    where: {
      name,
    },
    include: ['weaponStats', 'abilities']
  });
};
