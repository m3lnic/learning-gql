'use strict';
const {
  Model
} = require('sequelize');
const WeaponStats = require('./weaponstats');
module.exports = (sequelize, DataTypes) => {
  class WeaponName extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.WeaponStats, {
        as: 'weaponStats',
        foreignKey: 'weaponNameId',
      });
      this.belongsToMany(models.Ability, {
        through: 'WeaponAbilities',
        foreignKey: 'weaponId',
        as: 'abilities',
      });
      this.belongsToMany(models.Unit, {
        through: 'UnitWeapons',
        foreignKey: 'weaponId',
        as: 'units',
      });
    }
  };
  WeaponName.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'WeaponName',
  });

  return WeaponName;
};
