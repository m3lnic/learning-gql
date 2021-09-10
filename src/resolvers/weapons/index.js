const weaponMutations = {
  createWeapon: require('./createWeapon'),
};

const weaponQueries = {
  getWeapon: require('./getWeapon'),
  weapons: require('./weapons'),
};

module.exports = {
  weaponMutations,
  weaponQueries,
}
