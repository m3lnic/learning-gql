const { ValidationError, ApolloError } = require("apollo-server-errors");
const { Unit, WeaponName, Ability } = require("Models");

module.exports = async (_, { input: {
  name,
  movement,
  weaponSkill,
  ballisticSkill,
  strength,
  toughness,
  wounds,
  leadership,
  armourSave,
  weapons = [],
  abilities = [],
}}) => {
  try {
    const createdUnit = await Unit.create({
      name,
      movement,
      weaponSkill,
      ballisticSkill,
      strength,
      toughness,
      wounds,
      leadership,
      armourSave
    });

    console.log(name,
      movement,
      weaponSkill,
      ballisticSkill,
      strength,
      toughness,
      wounds,
      leadership,
      armourSave,
      weapons,
      abilities,
    );

    await Promise.all(weapons.map(async (value) => {
      let weapon = await WeaponName.findOne({ where: { id: value }});
      return createdUnit.addWeapon(weapon);
    }));
    
    await Promise.all(abilities.map(async (value) => {
      let ability = await Ability.findOne({ where: { id: value }});
      return createdUnit.addAbility(ability);
    }));
    
    const finalUnit = await Unit.findOne({ where: { id: createdUnit?.id }, include: [
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
    return finalUnit;
  } catch (e) {
    console.log(e);
    if (e instanceof ValidationError) {
      throw e;
    }

    throw new ApolloError('There was an error creating this weapon.');
  }
}
