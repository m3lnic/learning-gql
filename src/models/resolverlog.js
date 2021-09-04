'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResolverLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ResolverLog.init({
    name: DataTypes.STRING,
    arguments: DataTypes.STRING,
    context: DataTypes.STRING,
    returnValue: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    executionTime: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ResolverLog',
  });
  return ResolverLog;
};
