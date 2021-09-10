'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Units', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      movement: {
        type: Sequelize.INTEGER
      },
      weaponSkill: {
        type: Sequelize.INTEGER
      },
      ballisticSkill: {
        type: Sequelize.INTEGER
      },
      strength: {
        type: Sequelize.INTEGER
      },
      toughness: {
        type: Sequelize.INTEGER
      },
      wounds: {
        type: Sequelize.INTEGER
      },
      leadership: {
        type: Sequelize.INTEGER
      },
      armourSave: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Units');
  }
};
