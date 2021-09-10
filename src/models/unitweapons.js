'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UnitWeapons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UnitWeapons.init({
    unitId: DataTypes.INTEGER,
    weaponId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UnitWeapons',
  });
  return UnitWeapons;
};