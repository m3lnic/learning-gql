'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WeaponStats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.WeaponName, {
        as: 'weaponName',
        foreignKey: 'weaponNameId',
        onDelete: 'CASCADE',
      });
    }
  };
  WeaponStats.init({
    subAttackName: DataTypes.STRING,
    weaponNameId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    range: DataTypes.INTEGER,
    strength: DataTypes.INTEGER,
    armourPiercing: DataTypes.INTEGER,
    damage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'WeaponStats',
  });

  return WeaponStats;
};
