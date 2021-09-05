'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.WeaponName, {
        through: 'WeaponAbilities',
        foreignKey: 'abilityId',
        as: 'weapons',
      });
    }
  };
  Ability.init({
    name: DataTypes.STRING,
    effect: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ability',
  });
  return Ability;
};
