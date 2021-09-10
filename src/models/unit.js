'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.WeaponName, {
        through: 'UnitWeapons',
        foreignKey: 'unitId',
        as: 'weapons',
      });
      this.belongsToMany(models.Ability, {
        through: 'UnitAbilities',
        foreignKey: 'unitId',
        as: 'abilities',
      });
    }
  };
  Unit.init({
    name: DataTypes.STRING,
    movement: DataTypes.INTEGER,
    weaponSkill: DataTypes.INTEGER,
    ballisticSkill: DataTypes.INTEGER,
    strength: DataTypes.INTEGER,
    toughness: DataTypes.INTEGER,
    wounds: DataTypes.INTEGER,
    leadership: DataTypes.INTEGER,
    armourSave: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Unit',
  });
  return Unit;
};
