'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      surname: {
        type: Sequelize.STRING
      },
      forename: {
        type: Sequelize.STRING
      },
      patronymic: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      blocked: {
        type: Sequelize.BOOLEAN
      },
      addressId: {
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
    await queryInterface.dropTable('Users');
  }
};