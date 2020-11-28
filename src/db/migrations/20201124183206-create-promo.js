'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Promos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      shortDescription: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.INTEGER
      },
      show: {
        type: Sequelize.BOOLEAN
      },
      imageSrc: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Promos');
  }
};